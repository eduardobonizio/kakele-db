import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { pageNotFound as textOptions } from '../data/dataLanguages';

export default function NotFound() {
  const { locale } = useRouter();
  const text = textOptions[locale];
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <Head>
        <title>{text.title}</title>
        <meta name="description" content="Page not found" />
        <meta property="og:title" content="404 - Page not found" key="title" />
      </Head>
      <div>
        <h1>{text.description}</h1>
      </div>
    </div>
  );
}
