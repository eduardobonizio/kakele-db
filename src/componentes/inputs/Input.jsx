export default function Input({ type, value, onChange, labelText, style }) {
  return (
    <div className="input-group mb-2">
      <label htmlFor={labelText} className="input-group-text">
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={labelText}
        name={labelText}
        className={`form-control ${style && style.labelStyle}`}
      />
    </div>
  );
}
