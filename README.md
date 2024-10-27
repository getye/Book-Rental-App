# Book Rental App

This application allows Book Owners to register, manage their books, and view rental information. Renters can browse available books, place rental orders, and check their rental details. An Admin oversees all activities, including the registration of book owners and renters. The app also tracks earnings from book rentals, displays statistics for books, and calculates total revenue.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Book Management**: Book Owners can register and manage their books.
- **Rental Functionality**: Renters can browse available books, place rental orders, and track rental details.
- **Admin Control**: Admin oversees the registration of book owners and renters and can view platform statistics.
- **Revenue Tracking**: Track earnings from rentals and view statistics on total revenue.
- **Statistics Dashboard**: Display detailed insights into book statistics and total revenue.

## Installation

### Prerequisites
- **Node.js** and **npm**
- **PostgreSQL** database

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/getye/Book-Rental-App.git

2. **Navigate to the project directory**:
   ```bash
   cd Book-Rental-App

3. **Install dependencies**:
   ```bash
   npm install

4. **Start the development server**:
   ```bash
   npm start
5. **Access the application**: Open your browser and go to http://localhost:3000.

## Usage
- Book Owners can register, add books to their catalog, and view rental information.
- Renters can browse the book catalog, place rental orders, and view their rental history.
- Admin has access to all app functionalities, including user and rental management, as well as viewing rent and book statistics.

## Technologies Used

### Frameworks
- **React.js**: Frontend framework for building user interfaces, managing state, and rendering components dynamically.
- **Node.js**: Server-side runtime for executing JavaScript.
- **Express.js**: Backend framework for creating APIs and handling HTTP requests.

### Tools
- **PostgreSQL**: Relational database for storing book, owner, renter, and rental data.
- **JWT (JSON Web Tokens)**: Secure token-based authentication.
- **Material UI**: Component library for a modern, responsive UI.
- **Redux**: State management tool for managing app-wide state.
- **Redux Saga**: Used for API calling.