# Offline Training Company Website

## Description

This project is a full-featured website for an offline training company. It provides a comprehensive platform for managing courses, user registrations, and content, as well as a robust admin panel for complete control over the website.

## Features

-   **Frontend**:
-   **Frontend**:
    -   Basic HTML structure (`index.html`)
    -   Global styling (`style.css`)
    -   Main App component (`App.js`) to display the different pages.
    -   Components:
        -   `Header.js` (logo, menu, phone numbers, search bar, brochure, login/register, admin link)
        -   `Footer.js` (contact info, form, map, copyright, terms & conditions, privacy policy)
        - `Slider.js`: Component to display an auto-sliding image slider.
    -   Pages:
        -   `HomePage.js` (auto-sliding slider, about, auto-sliding logo slider, categories, matrix, stats)
        -   `CoursesPage.js` (courses list, categories, card view, table view)
        -   `CourseDetailPage.js` (course details, sessions, registration form)
        -   `ContactUsPage.js` (details, map, form)
        -   `AdminDashboard.js`: admin panel entry point.
        -   `AdminLogin.js`: Login page for admin.
        -   `ManageCategories.js`: to manage categories.
        -   `ManageCourses.js`: to manage courses.
        -   `ManageSessions.js`: to manage sessions.
        -   `ManageRegistrations.js`: to manage registrations.
        - `ManageUsers.js`: to manage users.
        - `ManageSlider.js`: to manage the slider.
        - `ManagePartners.js`: to manage partners.
        - `ManagePages.js`: to manage custom pages.
        - `PrivacyPolicy.js`: Privacy policy page.
        - `TermsConditions.js`: Terms & Conditions page.
-   **Backend**:
    -   Database schema (`init.sql`)
    -   Models (`backend/models/`)
    -   Routes (`backend/routes/`)
    -   Controllers (`backend/controllers/`)
    -   Server (`backend/index.js`)
    - Database connection using `mysql2`.
    - Session Management using `express-session`.
    - Email system using `nodemailer` (simulated)
- **Navigation**:
    - Can navigate between the main pages
    - Can navigate to the admin panel
    - Dynamic navigation between categories and courses
    - Dynamic navigation between categories and subcategories.
- **Functionalities**:
    - Can search courses
    - Can send registration requests
    - Can send contact messages
    - Can download the brochure
    - Admin can login and logout
    - Admin routes are protected.
    - Admin can create, delete and update courses, categories, sessions, users, sliders, partners and custom pages.
    - Can manage image uploads.
- **SEO**:
    - Meta tags and open graph tags added to the `index.html` file.
- **SEO**:
    - Meta tags and open graph tags added to the `index.html` file.

## Installation Instructions

### Prerequisites

-   **Node.js:** Ensure Node.js is installed on your local machine (for development) and on your server (for production).
-   **npm:** Ensure you have the node package manager installed.
-   **MySQL:** You will need a MySQL database server running either locally or on your hosting environment.
-   **cPanel:** If deploying to shared hosting, you will need access to cPanel.
-   **FTP client**: If deploying to a server, you will need an FTP client.

- **Text editor:** a text editor to edit the code. We recommend Visual Studio Code.

### Backend Setup

**Step 1: Database Setup**

1.  **Access cPanel:**
    -   Log in to your cPanel account using the credentials provided by your hosting provider.
2.  **Create a MySQL Database:**
    -   In cPanel, scroll down to the "Databases" section.
    -   Click on "MySQL Databases."
    -   Under "Create New Database," enter a database name (e.g., `training_db`).
    -   Click "Create Database."
    -   **Important:** Note down the database name. You'll need it later.
3.  **Create a Database User:**
    -   In the same "MySQL Databases" page, scroll down to "MySQL Users."
    -   Under "Add New User," enter a username (e.g., `training_user`).
    -   Enter a strong password or use the password generator.
    -   Click "Create User."
    -   **Important:** Note down the username and password. You'll need them later.
4.  **Add User to Database:**
    -   Scroll down to "Add User To Database."
    -   Select the user and database you just created from the dropdown menus.
    -   Click "Add."
5.  **Grant Privileges:**
    -   On the "Manage User Privileges" page, check "All Privileges."
    -   Click "Make Changes."
    -   This grants the user full access to the database.
6.  **Import Database Schema:**
    -   In the "Databases" section, click on "phpMyAdmin."
    -   Select the database you created from the left sidebar.
    -   Click on the "Import" tab in the top navigation.
    -   Click "Choose File" and select the `database/init.sql` file from your project directory.
    -   Click "Go" at the bottom of the page to import the schema and initial data.

**Step 2: Configure the Backend**

1.  **Access the `index.js` File:**
    -   You can do this locally, or from your server.
    - To do this locally, navigate to the `backend` directory in the project.
    - To do this in the server, log in to your cPanel account and then enter the "File manager". Then navigate to the `backend` folder.
    - Find the `index.js` file and open it in a text editor.
2.  **Update Database Credentials:**
    -   Locate the section in the file where the database connection is configured.
    -   Update the `host`, `user`, `password`, and `database` values with the credentials you noted down during the database setup.
    - Make sure to change the values that are in "quotes".
3.  **Save Changes:**
    - Save the file after making the changes.
4. **Upload the backend files**:
    - You can do this locally, or from your server.
    - To do this locally, use an FTP client, like Filezilla. Open the FTP client and connect to your server using the provided credentials. Upload the contents of the `backend` folder to a folder in your server (e.g. `backend`).
    - To do this in the server, log in to your cPanel account and then enter the "File manager". Then navigate to the folder where you will upload the backend files (e.g. `backend`) and upload all the contents of the local `backend` folder to the server folder.

**Step 3: Create a Node.js Application in cPanel**

1.  **Access Node.js Setup:**
    -   In cPanel, find the "Software" section.
    -   Click on "Setup Node.js App."
2.  **Create a New Application:**
    -   Click on the "Create Application" button.
3.  **Configure the Application:**
    -   **Node.js version:** Select the latest stable Node.js version from the dropdown.
    -   **Application mode:** Choose "Development" for initial setup. You can change this to "Production" later.
    -   **Application root:** Enter the path to the directory where you uploaded the backend files (e.g., `backend`).
    -   **Application URL:** If you want to access the app through a subdomain (e.g., `api.yourdomain.com`), select the subdomain. Otherwise, leave it as it is.
    -   **Application startup file:** Ensure this is set to `index.js`.
    - **Application Entry point:** Ensure this is set to `index.js`.
    -   Click "Create."
4.  **Install Dependencies:**
    -   After creating the application, you'll see a command to install dependencies. It will look something like this: `cd /home/yourusername/backend; npm install`
    -   Click on "Open" in the "Terminal" section.
    - Run the command from the terminal: `npm install`
5.  **Restart the Node.js Application:**
    -   Return to the Node.js application page in cPanel.
    -   Click the "Restart" button to start the backend server.

### Frontend Setup

**Step 1: Navigate to the Frontend Directory**

1.  **Open Your Terminal or Command Prompt:**
    -   Open your terminal or command prompt.
    -   Navigate to the project root directory where the `frontend` folder is located.
    - Use the `cd` command to navigate between folders.

**Step 2: Install Dependencies**

1.  **Run npm install:**
    -   In your terminal, run the following command:


## Development Instructions

### Running the Backend Locally

1.  **Navigate to the Backend:**
    -   Open a terminal or command prompt.
    -   Navigate to the `backend` directory.
2.  **Start the Server:**
    -   Run the command `node index.js`.
3.  **Access the Backend:**
    -   The backend will be accessible at `http://localhost:3000` by default.
    
### Running the Frontend Locally

1.  **Navigate to the Frontend:**
    -   Open a terminal or command prompt.
    -   Navigate to the `frontend` directory.
2.  **Start the Development Server:**
    -   Run the command `npm start`.
3.  **Access the Frontend:**
    -   The frontend will be accessible at `http://localhost:3001` by default.

## Database Schema
