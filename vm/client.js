// The outer page's end of the channel: one promise per evaluation.

// How long the inner page may stay silent before the boot is called
// failed. Its first message comes within a second of loading, and a
// download of the full disk sends progress as it goes.
const SILENCE_LIMIT_MS = 20000;

export function connect(frame, { onStatus = () => {} } = {}) {
  const pending = new Map();
  let next = 1;
  let ready, fail;
  const booted = new Promise((resolve, reject) => ([ready, fail] = [resolve, reject]));

  let heard = false;
  setTimeout(() => {
    if (!heard) {
      const message = `${frame.src} did not answer within ${SILENCE_LIMIT_MS / 1000} s; see its console`;
      onStatus(message);
      fail(new Error(message));
    }
  }, SILENCE_LIMIT_MS);

  addEventListener("message", ({ source, origin, data }) => {
    if (source !== frame.contentWindow || origin !== location.origin) return;
    heard = true;
    if (data.type === "progress") onStatus(data.stage);
    if (data.type === "ready") {
      onStatus(`ready after ${data.ms} ms`);
      ready(data);
    }
    if (data.type === "failed") {
      onStatus(data.message);
      fail(new Error(data.message));
    }
    if (data.type === "result") {
      pending.get(data.id)?.(data);
      pending.delete(data.id);
    }
  });

  return {
    booted,
    async evaluate(code) {
      await booted;
      const id = String(next++);
      const start = performance.now();
      const result = new Promise((resolve) => pending.set(id, resolve));
      frame.contentWindow.postMessage({ type: "eval", id, code }, location.origin);
      return { ...(await result), ms: Math.round(performance.now() - start) };
    },
    stop() {
      frame.contentWindow.postMessage({ type: "stop" }, location.origin);
    },
  };
}
