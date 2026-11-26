// Where the guest's /nix comes from: one read-only erofs image, which
// the kernel reads in 256 KiB chunks through HTTP Range requests.
//
// "full"  (the default) the page downloads the xz-compressed image once,
//         unpacks it into a Blob and hands the kernel a blob: URL, which
//         answers Range requests from memory. Works on any server, needs
//         nothing from it once loaded, and the next visit reads the
//         Cache API.
//
// "lazy"  the kernel fetches each chunk from the server the first time
//         the guest reads it. Needs a server that answers Range requests,
//         for the life of the page. It does not pay for the static nix:
//         a first evaluation reads 32 of its 33 MB, read-ahead included,
//         and nothing is compressed, against 9.9 MB for the whole image
//         in xz.

const MANIFEST = "disk.json";
const CACHE_NAME = "nix-vm-disk";

const absolute = (name) => new URL(name, location.href).href;

// A response of xz-compressed bytes as one of the bytes themselves.
// xzwasm (vendor/xzwasm.js) is a classic script that vm.html loads.
export function unxz(res, headers = {}) {
  return new Response(new globalThis.xzwasm.XzReadableStream(res.body), { headers });
}

async function answersRanges(url) {
  try {
    const res = await fetch(url, { headers: { range: "bytes=0-0" } });
    await res.body?.cancel();
    return res.status === 206;
  } catch {
    return false;
  }
}

// The compressed image, from the Cache API when an earlier visit kept it.
// The file name carries the image's hash, so a kept copy is never stale.
async function fetchCompressed(url, onProgress) {
  // No Cache API outside a secure context (http://0.0.0.0, a LAN address).
  const cache = await globalThis.caches?.open(CACHE_NAME).catch(() => null);
  const kept = await cache?.match(url);
  if (kept) {
    onProgress("disk from cache");
    return kept;
  }
  onProgress("downloading disk");
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${url}: HTTP ${res.status}`);
  }
  if (cache) {
    // Only this image's copy is kept.
    for (const old of await cache.keys()) {
      await cache.delete(old);
    }
    await cache.put(url, res.clone()).catch(() => {});
  }
  return res;
}

async function fullDisk(manifest, onProgress) {
  const res = await fetchCompressed(absolute(manifest.full), onProgress);
  onProgress("unpacking disk");
  const blob = await unxz(res).blob();
  if (blob.size !== manifest.size) {
    throw new Error(`${manifest.full}: unpacked ${blob.size} bytes, expected ${manifest.size}`);
  }
  return {
    mode: "full",
    spec: { kind: "http", url: URL.createObjectURL(blob), readOnly: true },
  };
}

export async function openDisk({ mode = "full", onProgress = () => {} } = {}) {
  const res = await fetch(MANIFEST, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`${MANIFEST}: HTTP ${res.status}`);
  }
  const manifest = await res.json();
  const lazyUrl = absolute(manifest.lazy);

  if (mode !== "lazy") {
    return fullDisk(manifest, onProgress);
  }
  if (!(await answersRanges(lazyUrl))) {
    throw new Error(`${manifest.lazy}: the server does not answer Range requests`);
  }
  return {
    mode: "lazy",
    spec: { kind: "http", url: lazyUrl, readOnly: true },
  };
}
