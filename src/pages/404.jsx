import Head from 'next/head';
import React from 'react';

export default function NotFound() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <Head>
        <title>Kakele Tools - Page not found</title>
        <meta name="description" content="Page not found" />
        <meta property="og:title" content="404 - Page not found" key="title" />
      </Head>
      <div>Página não encontrada</div>
    </div>
  );
}
