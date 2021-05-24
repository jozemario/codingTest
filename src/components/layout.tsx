import Header from "./header"
import Footer from "./footer"
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
     <Head>
	   <meta charSet="UTF-8" />
	    <title>{'Talos Coding Test'}</title>
	    <meta
	      name="description"
	      content={'Talos Coding Test'}
	    />
	    <meta name="viewport" content="width=device-width, initial-scale=1" />
	    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
		<link rel="manifest" href="/favicon/site.webmanifest"/>
		<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
		<link rel="shortcut icon" href="/favicon/favicon.ico"/>
		<meta name="msapplication-TileColor" content="#da532c"/>
		<meta name="msapplication-config" content="/favicon/browserconfig.xml"/>
		<meta name="theme-color" content="#ffffff"/>
	    {/*<meta property="og:url" content={props.url || defaultOGURL} />
	    <meta property="og:title" content={props.title || ''} />
	    <meta
	      property="og:description"
	      content={props.description || defaultDescription}
	    />
	    <meta name="twitter:site" content={props.url || defaultOGURL} />
	    <meta name="twitter:card" content="summary_large_image" />
	    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
	    <meta property="og:image" content={props.ogImage || defaultOGImage} />
	    <meta property="og:image:width" content="1200" />
	    <meta property="og:image:height" content="630" />*/}
	</Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}