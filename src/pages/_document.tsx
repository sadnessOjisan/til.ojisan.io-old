import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import admin from "firebase-admin";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cert = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // zeit now の環境変数だと\nが\\nにエスケープされてしまっているので元に戻す? .replace(/\\n/g, "\n")
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
    admin.initializeApp({
      credential: admin.credential.cert(cert),
    });
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
