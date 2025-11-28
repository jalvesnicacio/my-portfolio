function TextAreaGroup({ label, name, value, onChange, required = true }) {
  /**
   * TextAreaGroup component renders a labeled input field.
   *
   * @param {string} label - The label for the input field.
   * @param {string} name - The name attribute for the input field.
   * @param {string} value - The value of the input field.
   * @param {function} onChange - The function to call when the input value changes.
   * @param {boolean} required - Whether the input is required (default is true).
   */
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 font-semibold text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...(required ? { required } : {})}
        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-2/3"
        rows={4}
      ></textarea>
    </div>
  );
}

export default TextAreaGroup;
