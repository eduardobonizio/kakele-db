import { useRouter } from 'next/router';
import { BLESS_OPTIONS, UPGRADES_STAGES } from '../../../../data/kakeleData';

const UpgradeDiv = props => {
  const { pathname } = useRouter();
  const { text, changeUpgrades, upgrades, styles, rarity } = props;
  const status = ['armor', 'magic', 'attack'];
  const blessPage = pathname.includes('/bless');
  return (
    <div className={styles.upgradeDiv}>
      <span className="card-text">{text.upgrade}</span>
      {status.map((stat, index) => {
        return (
          <div key={stat + index}>
            <select
              className={styles.select}
              id={`${stat}-upgrade`}
              value={upgrades[stat]}
              onChange={e => changeUpgrades(Number(e.target.value), stat)}
            >
              {UPGRADES_STAGES.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        );
      })}
      {rarity.en !== 'Legendary' && !blessPage && (
        <div>
          <select
            className={styles.select}
            id="bless"
            value={upgrades.bless}
            onChange={e => changeUpgrades(Number(e.target.value), 'bless')}
          >
            {BLESS_OPTIONS.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default UpgradeDiv;
