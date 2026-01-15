function MediaInput({ label, onChange, filesCount = 0 }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-semibold text-gray-700">{label}</label>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => document.getElementById("media-input").click()}
          className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm hover:bg-gray-200"
        >
          Add media
        </button>

        <span className="text-sm text-gray-500">
          {filesCount > 0
            ? `${filesCount} file(s) selected`
            : "No files selected"}
        </span>
      </div>

      <input
        id="media-input"
        type="file"
        multiple
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}

export default MediaInput;
