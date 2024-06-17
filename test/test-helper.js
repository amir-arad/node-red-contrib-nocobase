const awaitInput = (node, assertion, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      node.removeListener("input", onInput);
      reject(new Error("Timeout waiting for input message"));
    }, timeout);

    const onInput = async (msg) => {
      try {
        await assertion(msg);
        resolve(msg);
      } catch (e) {
        reject(e);
      } finally {
        clearTimeout(timer);
        node.removeListener("input", onInput);
      }
    };
    node.on("input", onInput);
  });
};

module.exports = { awaitInput };
