import React from 'react';

export default function BlessSelector(props) {
  const { elementId, labelText, onChange, optionsArray, value } = props;
  return (
    <div className="input-group mb-2">
      <label className="input-group-text" htmlFor={elementId}>
        {labelText}
      </label>
      <select
        className="form-select"
        id={elementId}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      >
        {optionsArray.map(upgradeValue => (
          <option key={upgradeValue} value={upgradeValue}>
            {upgradeValue}
          </option>
        ))}
      </select>
    </div>
  );
}
