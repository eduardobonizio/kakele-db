import React from "react";
Import Head from "next/head"

export default function NotFound() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <Head>
        <title>Kakele Tools - 404</title>
        <meta
          name="description"
          content="Kakele Tools - Page Not Found"
        />
        <meta property="og:title" content="Kakele Tools - 404" key="title" />
      </Head>
      <div>Página não encontrada</div>
    </div>
  );
}
