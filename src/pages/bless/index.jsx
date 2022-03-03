import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Input from '../../componentes/inputs/Input';
import { blessJsx as textOptions } from '../../data/dataLanguages';
import { filterItemsByName } from '../../data/kakeleActions';
import { equipments, weapons } from '../../data/kakeleData';

const Bless = () => {
  const { query, locale } = useRouter();
  const text = textOptions[locale];
  const [itemName, setItemName] = useState('');
  const [foundItems, setFoundItems] = useState([]);

  const searchItem = searchText => {
    setItemName(searchText);
    const allItems = [...equipments, ...weapons];
    const result = filterItemsByName(allItems, searchText, locale);
    setFoundItems(result);
  };

  return (
    <div className="container d-flex flex-column justify-content-around align-items-center">
      <h1>{text.h1}</h1>

      <Input
        type="text"
        value={itemName}
        onChange={e => searchItem(e.target.value)}
        labelText={text.searchLabel}
        placeholder={text.searchPlaceHolder}
        style
      />
      {foundItems.map((suggestion, index) => {
        if (!suggestion) return false;
        return (
          <div key={index}>
            <Link href={`/bless?item=${suggestion['en']}`}>
              <a>{suggestion[locale]}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Bless;
