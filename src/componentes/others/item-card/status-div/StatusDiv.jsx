import { useRouter } from 'next/router';
import { RARITY_BONUS } from '../../../../lib/bless';

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
    rarity,
  } = props;
  const { pathname } = useRouter();

  const addBlessModifier = (statusValue, statusName) => {
    const totalStatus = itemsUpgrades[statusName] + statusValue;
    const blessBonus = RARITY_BONUS[rarity.en][blessModifier];
    return Math.floor(totalStatus + (totalStatus * blessBonus) / 100);
  };

  const blessPage = pathname.includes('/bless');

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
        {!blessPage && (
          <span className="card-text">{`${text.bless}: ${blessModifier}`}</span>
        )}
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
      {!blessPage && (
        <span className="card-text">{`${text.bless}: ${blessModifier}`}</span>
      )}
      <span className="card-text">{`${text.slot}: ${slot}`}</span>
    </div>
  );
};

export default StatusDiv;
