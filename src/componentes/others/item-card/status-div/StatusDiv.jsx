const StatusDiv = props => {
  const { text, armor, magic, attack, level, slot, blessModifier } = props;
  const addBlessModifier = status => {
    return Math.floor(status + (status * blessModifier) / 100);
  };

  if (blessModifier < 1)
    return (
      <>
        <span className="card-text">{`${text.armor}: ${armor}`}</span>
        <span className="card-text">{`${text.magic}: ${magic}`}</span>
        <span className="card-text">{`${text.attack}: ${attack}`}</span>
        <span className="card-text">{`${text.level}: ${level}`}</span>
        <span className="card-text">{`${text.slot}: ${slot}`}</span>
      </>
    );
  return (
    <>
      <span className="card-text">
        {`${text.armor}: `}
        <span className="blue">{`${addBlessModifier(armor)}`}</span>
      </span>
      <span className="card-text green">
        {`${text.magic}: `}
        <span className="blue">{`${addBlessModifier(magic)}`}</span>
      </span>
      <span className="card-text green">
        {`${text.attack}: `}
        <span className="blue">{`${addBlessModifier(attack)}`}</span>
      </span>
      <span className="card-text">{`${text.level}: ${level}`}</span>
      <span className="card-text">{`${text.slot}: ${slot}`}</span>
    </>
  );
};

export default StatusDiv;
