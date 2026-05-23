function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transferEngine = {
  async createRoom() {
    return generateCode();
  },

  startTransfer(file, callbacks) {
    let sentBytes = 0;
    const totalBytes = file.size;
    const chunkSize = 1024 * 1024;

    const interval = setInterval(() => {
      sentBytes += chunkSize;

      if (sentBytes >= totalBytes) {
        sentBytes = totalBytes;
        clearInterval(interval);

        callbacks.onProgress({
          progress: 100,
          sentBytes,
          totalBytes,
        });

        callbacks.onComplete();
        return;
      }

      const progress = Math.round((sentBytes / totalBytes) * 100);

      callbacks.onProgress({
        progress,
        sentBytes,
        totalBytes,
      });
    }, 300);
  },

  joinRoom(code, callbacks) {
    console.log("Joined room:", code);

    let receivedBytes = 0;
    const totalBytes = 30 * 1024 * 1024;
    const chunkSize = 1024 * 1024;

    const interval = setInterval(() => {
      receivedBytes += chunkSize;

      if (receivedBytes >= totalBytes) {
        receivedBytes = totalBytes;
        clearInterval(interval);

        callbacks.onProgress({
          progress: 100,
          receivedBytes,
          totalBytes,
        });

        const dummyBlob = new Blob(["Dummy received file content"], {
          type: "text/plain",
        });

        callbacks.onComplete({
          blob: dummyBlob,
        });

        return;
      }

      const progress = Math.round((receivedBytes / totalBytes) * 100);

      callbacks.onProgress({
        progress,
        receivedBytes,
        totalBytes,
      });
    }, 300);
  },
};

export default transferEngine;