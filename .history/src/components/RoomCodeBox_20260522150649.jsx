function RoomCodeBox({ code }) {
  return (
    <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-xl text-center">
      <p className="text-slate-600 mb-2">Share this code with receiver:</p>
      <h3 className="text-4xl font-bold tracking-widest text-blue-700">
        {code}
      </h3>
    </div>
  );
}

export default RoomCodeBox;