NodeJS - Coding Test
Talos Digital - 2021
Objective
The following coding test is intended to test your NodeJS capabilities, it’s a simple application
with regular functionality that you have probably used in the past.
The application will serve as the back end for Book management, the database will consist of a
list of books, book categories and admin users, where a book can have multiple categories
and the administrative user will be able to Add, Edit or Delete books.
Requirements
- Backend: Create a NodeJS application, It’s required to use Typescript (Plus points by
using Next.JS as your framework).
- Backend: Use Postgresql or MySQL as your database.
- Backend: Expose public REST APIs with the book, where you can limit the amount of
books, list books by categories or search for a particular title.
- BackEnd: Consume an external API to look for book information using the ISBN, bring
the author and book cover.
- Backend: Implement JWT Authentication with Email and Password.
- Backend: Expose private JWT RESTFUL APIs to allow Admins Add, Edit and Delete
Books.
- General: Deploy the application to a Heroku or similar free service, share the github
repository and database diagram.
Optional Items, but will be considered for your review.
- Use Next.js as the Node Framework
- BackEnd Nice to Have: Using web scraping, bring the amazon rating of the book and
the latest review, process this as a scheduled process and not realtime, store this
information on the database.
- FrontEnd: Consume the public APIs in a web site, that will list 10 Books per page
- FrontEnd: Consume the public APIs in a web site, and create a Book detail page
- FrontEnd Nice to Have: Create the application using ReactJS.
- FrontEnd Nice to Have: Create the Admin area of the application, with basic CRUD
functionality. Use a password protected area that will use JWT on the calls.
Notes
- Assume this is a real application and use secure practices for development.
- Create a brief description of the techniques you used on the application, where to store
the database credentials and how to process external data securely.
- We are open to alternatives, feel free to propose solutions and different approaches in
case you feel you can have a better one.