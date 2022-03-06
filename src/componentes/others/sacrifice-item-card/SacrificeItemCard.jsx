import Image from 'next/image';

export default function SacrificeItemCard(props) {
  const { style, item, locale, updateIgnoredItens } = props;
  return (
    <div className={`card mt-2 ${style.cardContainer}`}>
      <span className={`card-header card-title ${style.cardTitle}`}>
        {item[locale]}
      </span>
      <div className="d-flex">
        <div className={`${style.resultCardImage}`}>
          <Image
            src={item.imgUrl.replace('"', '').replace('"', '')}
            alt={item[locale]}
            width="32"
            height="32"
          />
        </div>

        <div>
          <div className={style.resultCardText}>
            <span>{`Quantidade: ${item.quantityToSacrifice}`}</span>
            <span>lvl: {item.level}</span>
            <span>{item.rarity[locale]}</span>
          </div>
          <div>
            <input
              type="checkbox"
              id={`ignore${item[locale]}`}
              name="scales"
              onClick={e => updateIgnoredItens(e.target.checked, item.en)}
            />
            <label htmlFor={`ignore${item[locale]}`}>Trocar Item</label>
          </div>
        </div>
      </div>
    </div>
  );
}
