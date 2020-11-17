import { AppProps } from "next/app";
import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import Firebase from "../infra/FirebaseClient";

const GlobalStyle = createGlobalStyle`
*,
*:after,
*:before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 16px;
  font-family:'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
}

body {
  box-sizing: border-box;
}
`;

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    Firebase.instance.init();
  }, []);
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Component {...pageProps} />
    </>
  );
};

export default App;
