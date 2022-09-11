import React from 'react';

export default function OrePriceUpdater(props) {
  const { oresPrice, setOresPrice, text } = props;

  const ores = Object.keys(oresPrice);

  return (
    <>
      {ores.map(key => (
        <div className="input-group mb-1" key={key}>
          <span className="input-group-text" id={`preco-${key}-bruto`}>
            {text[key]}
          </span>
          <input
            type="number"
            className="form-control"
            value={oresPrice[key] || ''}
            placeholder={text[key]}
            aria-label={text[key]}
            aria-describedby={`preco-${key}-bruto`}
            onChange={e => setOresPrice(key, e.target.value)}
          />
        </div>
      ))}
    </>
  );
}
