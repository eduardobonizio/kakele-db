import { useEffect } from 'react/cjs/react.production.min';

const StatusDiv = props => {
  const {
    text,
    armor,
    magic,
    attack,
    level,
    slot,
    blessModifier,
    styles,
    itemsUpgrades,
  } = props;
  const addBlessModifier = (statusValue, statusName) => {
    const totalStatus = itemsUpgrades[statusName] + statusValue;
    return Math.floor(totalStatus + (totalStatus * blessModifier) / 100);
  };

  if (blessModifier < 1)
    return (
      <div className={styles.statusDiv}>
        <span className="card-text">{`${text.level}: ${level}`}</span>
        <span className="card-text">{`${text.armor}: ${
          armor + itemsUpgrades.armor
        }`}</span>
        <span className="card-text">{`${text.magic}: ${
          magic + itemsUpgrades.magic
        }`}</span>
        <span className="card-text">{`${text.attack}: ${
          attack + itemsUpgrades.attack
        }`}</span>
        <span className="card-text">{`${text.slot}: ${slot}`}</span>
      </div>
    );
  return (
    <div className={styles.statusDiv}>
      <span className="card-text">{`${text.level}: ${level}`}</span>
      <span className="card-text">
        {`${text.armor}: ${armor} -> `}
        <span className="blue">{`${addBlessModifier(armor, 'armor')}`}</span>
      </span>
      <span className="card-text green">
        {`${text.magic}: ${magic} -> `}
        <span className="blue">{`${addBlessModifier(magic, 'magic')}`}</span>
      </span>
      <span className="card-text green">
        {`${text.attack}: ${attack} -> `}
        <span className="blue">{`${addBlessModifier(attack, 'attack')}`}</span>
      </span>
      <span className="card-text">{`${text.slot}: ${slot}`}</span>
    </div>
  );
};

export default StatusDiv;
