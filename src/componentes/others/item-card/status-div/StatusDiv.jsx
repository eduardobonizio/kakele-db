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
        <span className="card-text">
          {`${text.armor}: ${armor}`}
          {itemsUpgrades.armor > 0 && (
            <span>
              {`+${itemsUpgrades.armor} -> `}
              <span className="blue">{itemsUpgrades.armor + armor}</span>
            </span>
          )}
        </span>
        <span className="card-text">
          {`${text.magic}: ${magic}`}
          {itemsUpgrades.magic > 0 && (
            <span>
              {`+${itemsUpgrades.magic} -> `}
              <span className="blue">{itemsUpgrades.magic + magic}</span>
            </span>
          )}
        </span>
        <span className="card-text">
          {`${text.attack}: ${attack}`}
          {itemsUpgrades.attack > 0 && (
            <span>
              {`+${itemsUpgrades.attack} -> `}
              <span className="blue">{itemsUpgrades.attack + attack}</span>
            </span>
          )}
        </span>
        <span className="card-text">{`${text.slot}: ${slot}`}</span>
      </div>
    );
  return (
    <div className={styles.statusDiv}>
      <span className="card-text">{`${text.level}: ${level}`}</span>
      <span className="card-text">
        {`${text.armor}: ${armor}+${itemsUpgrades.armor} -> `}
        <span className="blue">{`${addBlessModifier(armor, 'armor')}`}</span>
      </span>
      <span className="card-text green">
        {`${text.magic}: ${magic}+${itemsUpgrades.magic} -> `}
        <span className="blue">{`${addBlessModifier(magic, 'magic')}`}</span>
      </span>
      <span className="card-text green">
        {`${text.attack}: ${attack}+${itemsUpgrades.attack} -> `}
        <span className="blue">{`${addBlessModifier(attack, 'attack')}`}</span>
      </span>
      <span className="card-text">{`${text.slot}: ${slot}`}</span>
    </div>
  );
};

export default StatusDiv;
