import { Html, Head, Main, NextScript } from "next/document";
import { ThemeModeScript } from 'flowbite-react';
export default function Document() {
  return (
    <Html lang="en">
      <Head>
          {/*<ThemeModeScript />*/}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      </body>
    </Html>
  );
}
