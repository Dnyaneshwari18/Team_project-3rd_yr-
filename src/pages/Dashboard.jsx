function Dashboard({ setPage }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          P2P File Share
        </h1>

        <p className="text-slate-600 mb-8">
          Share files directly browser-to-browser using a 6-digit room code.
          No login. No cloud upload.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setPage("send")}
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
          >
            Send File
          </button>

          <button
            onClick={() => setPage("receive")}
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
          >
            Receive File
          </button>
        </div>

        <p className="text-sm text-slate-500 mt-6">
          Your file is transferred directly using WebRTC.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;