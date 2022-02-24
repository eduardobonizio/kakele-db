// https://willianjusten.com.br/como-configurar-o-google-analytics-no-nextjs-em-2021

import Script from 'next/script';
import { GA_TRACKING_ID } from './lib/gtag';

const Analytics = () => (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <Script
      id="G-TAG"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
      }}
    />
  </>
);

export default Analytics;
