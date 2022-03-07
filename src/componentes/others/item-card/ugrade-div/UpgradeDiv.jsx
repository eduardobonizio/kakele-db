import { UPGRADES_STAGES } from '../../../../data/kakeleData';

const UpgradeDiv = props => {
  const { text, changeUpgrades, upgrades, styles } = props;
  const status = ['armor', 'magic', 'attack'];
  console.log(upgrades);
  return (
    <div className={styles.upgradeDiv}>
      <span className="card-text">Upgrade</span>
      {status.map((stat, index) => {
        return (
          <div key={stat + index}>
            +
            <select
              className={styles.select}
              id={`${stat}-upgrade`}
              defaultValue={upgrades[stat]}
              // onChange={e => updateFilter('characterClass', e.target.value)}
              onChange={e =>
                changeUpgrades({ ...upgrades, [stat]: Number(e.target.value) })
              }
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
