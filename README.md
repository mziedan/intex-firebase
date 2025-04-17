# Offline Training Company Website

## Description

This project is a full-featured website for an offline training company, offering a comprehensive platform for managing courses, user registrations, and content. It features a robust admin panel for complete control over the website's content and functionality.

## Features

### Frontend

*   **Technology:** Built using React, a popular JavaScript library for building user interfaces.
*   **Structure:**
    *   Basic HTML structure (`public/index.html`)
    *   Global styling (`public/css/style.css`)
    *   Main App component (`src/App.js`) to display the different pages.
*   **Components:**
    *   `Header.js`: Displays the company logo, main menu, contact phone numbers, search bar, a link to download the brochure, and login/register links.
    *   `Footer.js`: Includes contact information, a contact form, a map, copyright notice, and links to the terms & conditions and privacy policy.
    *   `Slider.js`: Displays an auto-sliding image slider.
*   **Pages:**
    *   `HomePage.js`: Features an auto-sliding slider, an "about us" section, an auto-sliding logo slider, a display of training categories, a matrix, and key statistics.
    *   `CoursesPage.js`: Lists all available courses, categorized for easy browsing, with options for card or table view.
    *   `CourseDetailPage.js`: Provides detailed information about each course, including session schedules and a registration form.
    *   `ContactUsPage.js`: Contains detailed contact information, a map, and a contact form.
    *   `AdminDashboard.js`: The main entry point to the admin panel.
    *   `AdminLogin.js`: A secure login page for administrators.
    *   `ManageCategories.js`: Tools for managing course categories.
    *   `ManageCourses.js`: Tools for managing courses.
    *   `ManageSessions.js`: Tools for managing course sessions.
    *   `ManageRegistrations.js`: Tools for managing user registrations.
    *   `ManageUsers.js`: Tools for managing users.
    *   `ManageSlider.js`: Tools for managing the image slider content.
    *   `ManagePartners.js`: Tools for managing partner information.
    *   `ManagePages.js`: Tools for managing custom content pages.
    *   `PrivacyPolicy.js`: Displays the company's privacy policy.
    *   `TermsConditions.js`: Displays the company's terms and conditions.

### Backend

*   **Technology:** The backend is built using Node.js and Express.js, providing a robust and scalable RESTful API.
*   **Architecture:**
    *   `config.js`: Contains the database connection configuration using the `mysql2` library.
    *   `index.js`: The main entry point for the backend application, handling Express.js setup, middleware, and route configuration.
    *   `controllers/`: Contains the logic for handling requests related to each resource (users, categories, courses, etc.). Each controller interacts with the corresponding model.
    *   `models/`: Defines the data models and database interactions for each resource.
    *   `routes/`: Contains the route definitions, connecting each API endpoint to its corresponding controller function.
*   **Database:** MySQL is used as the relational database management system. The database schema is defined in `database/init.sql`.
*   **Features:**
    *   Database connection using `mysql2`.
    *   Password hashing for user security using `bcrypt`.
    *   Email verification for new users.
    *   CORS enabled.
    *   RESTful API design for all resources.

### Navigation

*   Seamless navigation between the main pages of the website.
*   Easy access to the admin panel.
*   Dynamic navigation between categories and courses.

### Functionalities

*   Users can search for courses.
*   Users can submit registration requests for courses.
*   Users can send contact messages.
*   Users can download a company brochure.
*   Administrators can log in and log out securely.
*   Admin routes are protected, ensuring only authorized users can access them.
*   Administrators can create, delete, and update courses, categories, sessions, users, sliders, partners, and custom pages.
*   Image uploads are supported.

### User Security

*   **Password Hashing:** User passwords are now securely hashed using `bcrypt` before being stored in the database. This prevents passwords from being compromised even if the database is breached.
*   **Registration Information:** User registration now requires the following information:
    *   `user_name` (user's name)
    *   `user_email` (user's email)
    *   `user_password` (user's password)
    *   `user_phone` (user's phone number)
    *   `user_country` (user's country)
*   **Login Validation:** User login is validated using `bcrypt` to compare the provided password with the securely hashed password in the database.
* **Email validation:** The user email is validated to verify that there is not an already existing user with the same email.

### SEO

*   Meta tags and open graph tags have been added to `public/index.html` to improve SEO.

## Installation Instructions

### Prerequisites

*   **Node.js:** Make sure Node.js is installed on your local machine. You can download it from [https://nodejs.org/](https://nodejs.org/).
*   **npm:** npm (Node Package Manager) is included with Node.js.
*   **MySQL:** You need a MySQL database server running locally. If you don't have MySQL installed, download and install it from [https://www.mysql.com/downloads/](https://www.mysql.com/downloads/).
* **Text editor:** a text editor to edit the code. We recommend Visual Studio Code.

### Database Setup

1.  **Create a MySQL Database:**
    *   Open your MySQL client (e.g., MySQL Workbench, DBeaver, or the command-line tool).
    *   Create a new database. You can name it `courses_db` or choose another name.
    *   Create a new user for this database and grant all privileges to that user. Make sure to remember the database name, user, and password, because you will need them later.
2.  **Import Database Schema:**
    *   Navigate to the `database` directory in the project.
    *   Use your MySQL client to run the `init.sql` script against the database you just created. This will create all the necessary tables.

### Backend Setup

1.  **Navigate to the Backend Directory:**
    *   Open your terminal or command prompt.
    *   Navigate to the `backend` directory in the project.
2.  **Configure Database Connection:**
    *   Open the `backend/config.js` file in a text editor.
    *   Update the `host`, `user`, `password`, and `database` values with the credentials you created during the database setup.
3.  **Install Dependencies:**
    *   In your terminal, run the following command: `bash npm install`
    *   This will install all the backend dependencies (Express, cors, mysql2, bcrypt).
4.  **Start the Backend Server:**
    *   Run the following command: `bash node index.js`
    *   The backend server will start and listen on port 3001.

### Frontend Setup

1.  **Navigate to the Frontend Directory:**
    *   In your terminal, navigate to the root directory of the project, where you will find the `src` folder.
2.  **Install Dependencies:**
    *   Run the following command: `bash npm install`
    *   This will install all the frontend dependencies (React, react-router-dom).
3.  **Start the Frontend Development Server:**
    *   Run the following command: `bash npm start`
    *   The frontend development server will start and open in your browser at `http://localhost:3000`.

## Development Instructions

### Running the Backend Locally

1.  **Navigate to the Backend:**
    *   Open a terminal or command prompt.
    *   Navigate to the `backend` directory.
2.  **Start the Server:**
    *   Run the command `node index.js`.
3.  **Access the Backend:**
    *   The backend will be accessible at `http://localhost:3001`.

### Running the Frontend Locally

1.  **Navigate to the Frontend:**
    *   Open a terminal or command prompt.
    *   Navigate to the root directory of the project, where you will find the `src` folder.
2.  **Start the Development Server:**
    *   Run the command `npm start`.
3.  **Access the Frontend:**
    *   The frontend will be accessible at `http://localhost:3000`.

## Database Schema

The database schema is defined in the `database/init.sql` file. This file creates a database called `courses_db` and the following tables: `users`, `categories`, `courses`, `pages`, `partners`, `registrations`, `sessions`, and `slider`.

