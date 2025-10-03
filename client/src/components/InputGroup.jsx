function InputGroup({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = true,
}) {
  /**
   * InputGroup component renders a labeled input field.
   *
   * @param {string} label - The label for the input field.
   * @param {string} name - The name attribute for the input field.
   * @param {string} type - The type of the input field (default is "text").
   * @param {string} value - The value of the input field.
   * @param {function} onChange - The function to call when the input value changes.
   * @param {boolean} required - Whether the input is required (default is true).
   */
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 font-semibold text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        {...(type !== "file" ? { value } : {})}
        value={value}
        onChange={onChange}
        {...(required ? { required } : {})}
        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-2/3"
      />
    </div>
  );
}

export default InputGroup;
