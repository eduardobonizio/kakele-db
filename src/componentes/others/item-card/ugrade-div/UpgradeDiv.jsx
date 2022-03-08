import { UPGRADES_STAGES } from '../../../../data/kakeleData';

const UpgradeDiv = props => {
  const { text, changeUpgrades, upgrades, styles } = props;
  const status = ['armor', 'magic', 'attack'];

  return (
    <div className={styles.upgradeDiv}>
      <span className="card-text">{text.upgrade}</span>
      {status.map((stat, index) => {
        return (
          <div key={stat + index}>
            +
            <select
              className={styles.select}
              id={`${stat}-upgrade`}
              defaultValue={upgrades[stat]}
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
    </div>
  );
};

export default UpgradeDiv;
