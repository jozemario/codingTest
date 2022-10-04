import Layout from '../components/layout'

export default function Page () {
  return (
    <Layout>
      {/* <h1>Talos Coding Test NextJs</h1> */}
      <h1 className="m-4 text-center text-4xl text-red-500">Talos Coding Test NextJs</h1>
      <h1>Objective</h1>
      <p>

The following coding test is intended to test your NodeJS capabilities, it’s a simple application
with regular functionality that you have probably used in the past.<br/>
The application will serve as the back end for Book management, the database will consist of a
list of books, book categories and admin users, where a book can have multiple categories
and the administrative user will be able to Add, Edit or Delete books.</p>
<h1>Requirements</h1>
<p>
- Backend: Create a NodeJS application, It’s required to use Typescript (Plus points by
using Next.JS as your framework).<br/>
- Backend: Use Postgresql or MySQL as your database.<br/>
- Backend: Expose public REST APIs with the book, where you can limit the amount of
books, list books by categories or search for a particular title.<br/>
- BackEnd: Consume an external API to look for book information using the ISBN, bring
the author and book cover.<br/>
- Backend: Implement JWT Authentication with Email and Password.<br/>
- Backend: Expose private JWT RESTFUL APIs to allow Admins Add, Edit and Delete
Books.<br/>
- General: Deploy the application to a Heroku or similar free service, share the github
repository and database diagram.<br/>
Optional Items, but will be considered for your review.<br/>
- Use Next.js as the Node Framework<br/>
- BackEnd Nice to Have: Using web scraping, bring the amazon rating of the book and
the latest review, process this as a scheduled process and not realtime, store this
information on the database.<br/>
- FrontEnd: Consume the public APIs in a web site, that will list 10 Books per page<br/>
- FrontEnd: Consume the public APIs in a web site, and create a Book detail page<br/>
- FrontEnd Nice to Have: Create the application using ReactJS.<br/>
- FrontEnd Nice to Have: Create the Admin area of the application, with basic CRUD
functionality. Use a password protected area that will use JWT on the calls.<br/><br/>
Notes<br/>
- Assume this is a real application and use secure practices for development.<br/>
- Create a brief description of the techniques you used on the application, where to store
the database credentials and how to process external data securely.<br/>
- We are open to alternatives, feel free to propose solutions and different approaches in
case you feel you can have a better one.
      </p>
    </Layout>
  )
}
