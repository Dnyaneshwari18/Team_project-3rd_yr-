import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import SendFile from "./pages/SendFile";
import ReceiveFile from "./pages/ReceiveFile";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-100">
      {page === "dashboard" && <Dashboard setPage={setPage} />}
      {page === "send" && <SendFile setPage={setPage} />}
      {page === "receive" && <ReceiveFile setPage={setPage} />}
    </div>
  );
}

export default App;