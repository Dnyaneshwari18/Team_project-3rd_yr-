function formatBytes(bytes) {
  if (!bytes) return "0 MB";
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

function ProgressBar({ progress, sentBytes, totalBytes }) {
  return (
    <div className="mt-6">
      <div className="flex justify-between text-sm mb-2">
        <span>{progress}%</span>
        <span>
          {formatBytes(sentBytes)} / {formatBytes(totalBytes)}
        </span>
      </div>

      <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;