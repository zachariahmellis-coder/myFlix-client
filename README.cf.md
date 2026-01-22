# myFlix Client

This repository contains the client-side application for the myFlix project, developed as part of the CareerFoundry Software Engineering program.

The client application consumes a RESTful backend API and provides user authentication, protected movie access, and form-based interactions using React.

---

## Exercise 3.5 – React Forms & Authentication

This stage of the project focuses on implementing React forms, client-side validation, and authentication logic.

---

## Features Implemented

- Login form with client-side validation
- Signup form with validation aligned to backend rules
- JWT-based authentication
- Authentication token stored in localStorage to persist login sessions
- Protected access to movie data
- Logout functionality that clears application state and localStorage

Non-authenticated users are presented with Login and Signup views.  
Authenticated users can access the movie list and log out of the application.

---

## Authentication Flow

1. User submits login credentials via the Login form
2. Credentials are sent to the backend `/login` endpoint
3. On successful authentication, a JWT is returned
4. The token and user data are stored in localStorage
5. Authenticated requests include the token in the Authorization header
6. Logout clears stored authentication data

---

## Technologies Used

- React
- JavaScript (ES6+)
- HTML
- CSS / SCSS
- Parcel
- Fetch API

---

## Project Structure

myFlix-client  
├── package.json  
├── package-lock.json  
├── README.md  
└── src  
&nbsp;&nbsp;&nbsp;&nbsp;├── index.html  
&nbsp;&nbsp;&nbsp;&nbsp;├── index.jsx  
&nbsp;&nbsp;&nbsp;&nbsp;├── index.scss  
&nbsp;&nbsp;&nbsp;&nbsp;└── components  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── login-view  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── signup-view  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── main-view  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── movie-card  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── movie-view

---

## How to Run the Client (Local)

Navigate to the client directory:
cd myFlix-client

Install dependencies:
npm install

Start the development server:
npm start

Ensure the backend API is running before attempting to log in.

---

## Backend Integration

The client communicates with a RESTful backend API that provides authentication and movie data.

Authenticated requests to the `/movies` endpoint include a valid JWT passed as a Bearer token in the Authorization header.

---

## Testing

Client functionality was tested manually by:

- Verifying form validation behavior
- Confirming successful login and token storage
- Ensuring protected movie data loads only when authenticated
- Verifying logout clears authentication state

---

## Project Status

All requirements for CareerFoundry Exercise 3.5 have been implemented and verified.

---

## Author

Zachariah M. Ellis  
CareerFoundry Software Engineering Student
