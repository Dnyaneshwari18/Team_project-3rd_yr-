import { useState } from "react";

function JoinRoomForm({ onJoinRoom }) {
  const [code, setCode] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (code.length !== 6) {
      alert("Enter valid 6-digit code");
      return;
    }

    onJoinRoom(code);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="block mb-2 font-semibold">Enter Room Code</label>

      <input
        type="text"
        maxLength="6"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        placeholder="123456"
        className="w-full border p-3 rounded-xl text-center text-2xl tracking-widest"
      />

      <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl">
        Join Room
      </button>
    </form>
  );
}

export default JoinRoomForm;