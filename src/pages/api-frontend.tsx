import Layout from '../components/layout'
import { ItemList } from '../components/ItemList'

export default function Page () {
  return (
    <Layout>
      <h1>API Public FrontEnd</h1>
      <p>The examples below show responses from the example API endpoints.</p>
      
      {/*<h2>Session</h2>
      <p>/api/examples/session</p>
      <iframe src="/api/examples/session"/>*/}
      <h2>FrontEnd: Consume the public APIs in a web site, that will list 10 Books per page</h2>
      <p>/api/public/books/10</p>
      <iframe src="/api/public/books/10"/>

      <h1>API External FrontEnd</h1>
      <p>The examples below show responses from the example API endpoints.</p>
      
      {/*<h2>Session</h2>
      <p>/api/examples/session</p>
      <iframe src="/api/examples/session"/>*/}
      <h2>BackEnd: Consume an external API to look for book information using the ISBN, bring
the author and book cover.</h2>
      <p>/api/external/books/isbn/OL30231029M</p>
      <iframe src="/api/external/books/isbn/OL30231029M"/>
    </Layout>
  )
}