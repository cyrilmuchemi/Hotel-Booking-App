import Document, { Html, Head, Main } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({

        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      })
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
        <link
            rel="stylesheet"
            type="text/css"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        />
        <link
            rel="stylesheet"
            type="text/css"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        </Head>
        <body>
          <Main />
        </body>
      </Html>
    )
  }
}

export default MyDocument