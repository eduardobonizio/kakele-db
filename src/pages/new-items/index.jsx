import { useRouter } from 'next/router';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import { NEW_ITEMS } from '../../data/kakeleData';

const NewItemsPage = () => {
  const { locale, locales } = useRouter();
  const newItems = NEW_ITEMS;
  return (
    <>
      <div>
        {newItems.map((item, index) => (
          <ItemCard key={index} index={index} item={item} locale={locale} />
        ))}
      </div>
    </>
  );
};

export default NewItemsPage;
