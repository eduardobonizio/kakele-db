import Head from 'next/head';
import Link from 'next/link';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import { equipments, weapons } from '../../data/kakeleData';
import styles from './ShowItem.module.css';
import { showItemJsx as textOptions } from '../../data/dataLanguages';

function Item({ item, locale, previousItemLink, nextItemLink }) {
  const text = textOptions[locale];
  console.log(locale, previousItemLink, nextItemLink);
  return (
    <div className={`container ${styles.itemContainer}`}>
      <Head>
        <title>{`${item[locale]} - Kakele MMORPG`}</title>
        <meta
          name="description"
          content="See all items description, sources, and more informations of all items from Kakele MMORPG"
        />
        <meta
          property="og:title"
          content="Equipment Wiki - Kakele MMORPG"
          key="title"
        />
      </Head>
      <div className={`${styles.buttonContainer}`}>
        <Link href={previousItemLink} passHref>
          <LinkButton text={text.previous} />
        </Link>
        <Link href="/set" passHref>
          <LinkButton text={text.showSet} />
        </Link>
        <Link href={nextItemLink} passHref>
          <LinkButton text={text.next} />
        </Link>
      </div>

      <div className="row">
        <ItemCard item={item} locale={locale} />
      </div>
    </div>
  );
}

export async function getStaticProps({ params, locale }) {
  const allItems = [...equipments, ...weapons];
  const currentItem = allItems.find(item => item[locale] === params.name[0]);
  const index = allItems.indexOf(currentItem);

  const previousItem =
    index <= 0 ? allItems[allItems.length - 1] : allItems[index - 1];
  const nextItem =
    index >= allItems.length - 1 ? allItems[0] : allItems[index + 1];
  return {
    props: {
      item: currentItem,
      previousItemLink: `/wiki/${previousItem[locale]}`,
      nextItemLink: `/wiki/${nextItem[locale]}`,
      locale,
    },
  };
}

export async function getStaticPaths({ locales }) {
  const allPaths = locales
    .map(locale => {
      return [...equipments, ...weapons].map(item => {
        if (!item[locale]) return;
        return {
          params: { name: [item[locale]] },
          locale: locale,
        };
      });
    })
    .reduce((curr, next) => {
      return [...curr, ...next];
    }, []);

  return {
    paths: allPaths,
    fallback: false,
  };
}

export default Item;
