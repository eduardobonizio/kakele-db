export default function Input({
  type,
  value,
  onChange,
  labelText,
  style,
  placeholder,
  autocomplete,
}) {
  return (
    <div className={`input-group mb-2 ${style && style.containerStyle}`}>
      <label
        htmlFor={labelText}
        className={`input-group-text ${style && style.labelStyle}`}
      >
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={labelText}
        name={labelText}
        className={`form-control ${style && style.inputStyle}`}
        placeholder={placeholder || ''}
        autoComplete={autocomplete || 'on'}
      />
    </div>
  );
}
