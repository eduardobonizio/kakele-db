import React from 'react';

export default function UpgradeSelector(props) {
  const { elementId, labelText, onChange, optionsArray } = props;
  return (
    <div className="input-group mb-1">
      <label className="input-group-text" htmlFor={elementId}>
        {labelText}
      </label>
      <select
        className="form-select"
        id={elementId}
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
