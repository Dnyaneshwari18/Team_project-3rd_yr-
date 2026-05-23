const messages = {
  idle: "Waiting to start.",
  file_selected: "File selected successfully.",
  room_created: "Room created. Share the code with receiver.",
  connecting: "Connecting to peer...",
  transferring: "Sending file...",
  receiving: "Receiving file...",
  completed: "Transfer completed successfully.",
  failed: "Transfer failed.",
  cancelled: "Transfer cancelled.",
};

function TransferStatus({ status }) {
  return (
    <div className="mt-5 bg-slate-100 p-3 rounded-xl">
      <b>Status:</b> {messages[status] || status}
    </div>
  );
}

export default TransferStatus;