import { useRouter } from 'next/router';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import { NEW_ITEMS } from '../../data/kakeleData';
import styles from './NewItems.module.css';

const NewItemsPage = () => {
  const { locale, locales } = useRouter();
  const newItems = NEW_ITEMS;
  return (
    <div className={`container ${styles.mainContainer}`}>
      <div className={`row row-cols-auto ${styles.row}`}>
        {newItems.map((item, index) => (
          <div className={`col ${styles.col}`} key={item[locale]}>
            <ItemCard index={index} item={item} locale={locale} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewItemsPage;
