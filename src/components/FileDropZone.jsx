import { useState } from "react";

function FileDropZone({ onFileSelected }) {
  const [dragging, setDragging] = useState(false);

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      onFileSelected(file);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      onFileSelected(file);
    }
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-2xl p-8 text-center ${
        dragging ? "border-blue-600 bg-blue-50" : "border-slate-300"
      }`}
    >
      <p className="text-slate-700 mb-4">
        Drag and drop your file here
      </p>

      <input
        type="file"
        onChange={handleFileChange}
        className="block mx-auto"
      />
    </div>
  );
}

export default FileDropZone;