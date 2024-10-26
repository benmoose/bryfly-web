import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <meta
            name='description'
            content='Disco and mirror balls.'
          />
          <meta property='og:site_name' content='bryfly.co.uk' />
          <meta
            property='og:description'
            content="See pictures of Bryony's disco and mirror balls."
          />
          <meta property='og:title' content='BryFly' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='BryFly Disco Balls' />
          <meta
            name='twitter:description'
            content="See pictures of Bryony's disco and mirror balls."
          />
        </Head>
        <body className='bg-black antialiased'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
