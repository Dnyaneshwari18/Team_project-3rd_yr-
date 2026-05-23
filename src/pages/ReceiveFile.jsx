import { useState } from "react";
import JoinRoomForm from "../components/JoinRoomForm";
import ProgressBar from "../components/ProgressBar";
import TransferStatus from "../components/TransferStatus";
import MobileWarning from "../components/MobileWarning";
import { useWakeLock } from "../hooks/useWakeLock";
import { usePageVisibility } from "../hooks/usePageVisibility";
import transferEngine from "../services/transferEngine";

function ReceiveFile({ setPage }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [receivedBytes, setReceivedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");

  const { enableWakeLock, disableWakeLock } = useWakeLock();
  const isHidden = usePageVisibility();

  async function handleJoinRoom(code) {
    setError("");
    setStatus("connecting");

    await enableWakeLock();

    transferEngine.joinRoom(code, {
      onProgress: ({ progress, receivedBytes, totalBytes }) => {
        setProgress(progress);
        setReceivedBytes(receivedBytes);
        setTotalBytes(totalBytes);
        setStatus("receiving");
      },
      onComplete: async ({ blob }) => {
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setStatus("completed");
        await disableWakeLock();
      },
      onError: async (message) => {
        setError(message);
        setStatus("failed");
        await disableWakeLock();
      },
    });
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <button
          onClick={() => setPage("dashboard")}
          className="text-blue-600 mb-4"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-4">Receive File</h2>

        {isHidden && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-4">
            Keep this tab open during transfer.
          </div>
        )}

        <MobileWarning />

        <JoinRoomForm onJoinRoom={handleJoinRoom} />

        {error && <p className="text-red-600 mt-4">{error}</p>}

        <TransferStatus status={status} />

        {status === "receiving" || status === "completed" ? (
          <ProgressBar
            progress={progress}
            sentBytes={receivedBytes}
            totalBytes={totalBytes}
          />
        ) : null}

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="received-file"
            className="block mt-6 text-center bg-green-600 text-white py-3 rounded-xl"
          >
            Download File
          </a>
        )}
      </div>
    </div>
  );
}

export default ReceiveFile;