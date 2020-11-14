import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import Firebase from "../infra/firebaseClient";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    Firebase.instance.init();
  }, []);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" /> */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
