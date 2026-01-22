myFlix Client

The myFlix Client is a single-page application built with React that allows users to browse movies, view details, and manage authentication. This project was developed as part of the CareerFoundry Software Engineering program and connects to a custom RESTful API.

The application demonstrates client-side authentication, protected API requests using JWTs, and form handling with validation.

Features

User login and signup forms with client-side validation

JWT-based authentication

Authentication state persisted with localStorage

Protected movie fetching using Bearer tokens

Logout functionality that clears session data

Movie list and detailed movie view

Conditional rendering based on authentication state

Tech Stack

React

JavaScript (ES6+)

Parcel (build tool)

HTML5

CSS

Node.js / npm

Project Structure
myFlix-client
├── package.json
├── package-lock.json
├── README.md
├── src
│ ├── index.html
│ ├── index.jsx
│ ├── index.scss
│ └── components
│ ├── main-view
│ │ └── main-view.jsx
│ ├── login-view
│ │ └── login-view.jsx
│ ├── signup-view
│ │ └── signup-view.jsx
│ ├── movie-card
│ │ └── movie-card.jsx
│ └── movie-view
│ └── movie-view.jsx

How to Run the Client (Local)

Install dependencies:

npm install

Start the development server:

npx parcel src/index.html

Open the app in your browser:

http://localhost:1234

Authentication Flow

New users can register using the signup form.

Existing users log in with their credentials.

On successful login:

A JWT and user object are stored in localStorage.

Authenticated requests include the JWT in the Authorization header.

Logging out clears localStorage and resets application state.

API Integration

The client consumes a custom REST API that provides:

User registration and authentication

Secure movie data access via JWT authorization

All requests to protected endpoints include a valid Bearer token.

Project Status

This client fulfills the requirements for CareerFoundry Exercise 3.5: React Forms and Authentication. It is designed to be extended in later exercises with client-side routing, profile management, and additional features.

Author

Zachariah M. Ellis
CareerFoundry Software Engineering Student
