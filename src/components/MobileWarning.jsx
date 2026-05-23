function MobileWarning() {
  return (
    <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-xl mb-5">
      <p className="font-semibold mb-1">Mobile Transfer Tip</p>
      <p className="text-sm">
        Keep this tab open. Do not lock your phone or switch apps during transfer.
        Use stable Wi-Fi for large files.
      </p>
    </div>
  );
}

export default MobileWarning;