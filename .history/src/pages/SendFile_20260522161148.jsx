import { useState } from "react";
import FileDropZone from "../components/FileDropZone";
import ProgressBar from "../components/ProgressBar";
import RoomCodeBox from "../components/RoomCodeBox";
import TransferStatus from "../components/TransferStatus";
import MobileWarning from "../components/MobileWarning";
import { validateFile } from "../hooks/useFileValidation";
import { useWakeLock } from "../hooks/useWakeLock";
import { usePageVisibility } from "../hooks/usePageVisibility";
import transferEngine from "../services/transferEngine";

function SendFile({ setPage }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [sentBytes, setSentBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);

  const { enableWakeLock, disableWakeLock } = useWakeLock();
  const isHidden = usePageVisibility();

  function handleFileSelected(file) {
    const result = validateFile(file);

    if (!result.valid) {
      setError(result.message);
      setSelectedFile(null);
      return;
    }

    setError("");
    setSelectedFile(file);
    setTotalBytes(file.size);
    setStatus("file_selected");
  }

  async function handleCreateRoom() {
    const code = await transferEngine.createRoom();
    setRoomCode(code);
    setStatus("room_created");
  }

  async function handleStartTransfer() {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    setStatus("transferring");
    await enableWakeLock();

    transferEngine.startTransfer(selectedFile, {
      onProgress: ({ progress, sentBytes, totalBytes }) => {
        setProgress(progress);
        setSentBytes(sentBytes);
        setTotalBytes(totalBytes);
      },
      onComplete: async () => {
        setStatus("completed");
        await disableWakeLock();
      },
      onError: async (message) => {
        setStatus("failed");
        setError(message);
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

        <h2 className="text-2xl font-bold mb-4">Send File</h2>

        {isHidden && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-4">
            Keep this tab open during transfer.
          </div>
        )}

        <MobileWarning />

        <FileDropZone onFileSelected={handleFileSelected} />

        {selectedFile && (
          <div className="mt-4 bg-slate-100 p-4 rounded-xl">
            <p><b>File:</b> {selectedFile.name}</p>
            <p><b>Size:</b> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            <p><b>Type:</b> {selectedFile.type || "Unknown"}</p>
          </div>
        )}

        {error && <p className="text-red-600 mt-4">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleCreateRoom}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Create Room
          </button>

          <button
            onClick={handleStartTransfer}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Start Transfer
          </button>
        </div>

        {roomCode && <RoomCodeBox code={roomCode} />}

        <TransferStatus status={status} />

        {status === "transferring" || status === "completed" ? (
          <ProgressBar
            progress={progress}
            sentBytes={sentBytes}
            totalBytes={totalBytes}
          />
        ) : null}
      </div>
    </div>
  );
}

export default SendFile;
export default useWakeKa;