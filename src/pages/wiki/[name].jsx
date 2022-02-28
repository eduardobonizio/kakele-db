import Head from 'next/head';
import Link from 'next/link';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import accesories from '../../data/items/accesories.json';
import styles from './ShowItem.module.css';
import { showItemJsx as textOptions } from '../../data/dataLanguages';
import { useRouter } from 'next/router';

function Item({ item, previousItemLink, nextItemLink }) {
  const router = useRouter();
  const { locales } = router;
  const locale = router.locale === 'en' ? 'en' : 'pt';
  const text = textOptions[locale];
  return (
    <div className={`container ${styles.itemContainer}`}>
      <Head>
        <title>{`${item[locale]} Kakele MMORPG Wiki`}</title>
        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}/wiki/${item[loc]}`}
              key={loc}
            />
          );
        })}
        <meta
          name="description"
          content={`${item[locale]} ${text.oneItemDescription}`}
        />
        <meta
          property="og:title"
          content={`${item[locale]} Kakele MMORPG Wiki`}
          key="title"
        />
      </Head>
      <div className={`${styles.buttonContainer}`}>
        <Link href={previousItemLink} passHref locale={locale}>
          <LinkButton text={text.previous} />
        </Link>
        <Link href="/set-viewer" passHref locale={locale}>
          <LinkButton text={text.showSet} />
        </Link>
        <Link href={nextItemLink} passHref locale={locale}>
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
  const allItems = [...accesories];
  const currentItem = allItems.find(item => item[locale] === params.name);
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
    },
  };
}

export async function getStaticPaths({ locales }) {
  const allPaths = locales
    .map(locale => {
      return [...accesories].map(item => {
        if (!item[locale]) return;
        return {
          params: { name: item[locale] },
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
