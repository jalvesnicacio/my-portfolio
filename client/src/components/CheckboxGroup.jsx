function CheckboxGroup({ label, name, checked, onChange }) {
  /**
   * CheckboxGroup component renders a labeled checkbox.
   *
   * @param {string} label - The label for the checkbox field.
   * @param {string} name - The name attribute for the checkbox.
   * @param {boolean} checked - Whether the checkbox is checked.
   * @param {function} onChange - The function to call when the checkbox state changes.
   */
  return (
    <div className="flex items-center mb-4">
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
}

export default CheckboxGroup;
