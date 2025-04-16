CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    parent_category_id INT NULL,
    FOREIGN KEY (parent_category_id) REFERENCES categories(id)
);
INSERT INTO categories (name, description, image) VALUES
('Technology', 'Courses related to technology', 'technology.jpg'),
('Business', 'Courses related to business and management', 'business.jpg'),
('Design', 'Courses related to design and creativity', 'design.jpg');

CREATE TABLE courses (id INT AUTO_INCREMENT PRIMARY KEY, category_id INT, code VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, duration INT, description TEXT, image VARCHAR(255), FOREIGN KEY (category_id) REFERENCES categories(id));
INSERT INTO courses (category_id, code, name, duration, description, image) VALUES
(1, 'TECH101', 'Web Development', 7, 'Learn to build websites', 'web-development.jpg'),
(1, 'TECH201', 'Data Science', 14, 'Learn about data analysis and machine learning', 'data-science.jpg'),
(2, 'BUS101', 'Project Management', 5, 'Learn to manage projects effectively', 'project-management.jpg'),
(2, 'BUS201', 'Financial Analysis', 10, 'Learn to analyze financial data', 'financial-analysis.jpg'),
(3, 'DES101', 'Graphic Design', 7, 'Learn the basics of graphic design', 'graphic-design.jpg'),
(3, 'DES201', 'UX/UI Design', 14, 'Learn about user experience and user interface design', 'ux-ui-design.jpg');
CREATE TABLE sessions (id INT AUTO_INCREMENT PRIMARY KEY, course_id INT, location VARCHAR(255), timeslot TIME, FOREIGN KEY (course_id) REFERENCES courses(id));
INSERT INTO sessions (course_id, location, timeslot) VALUES
(1, 'Room A', '09:00:00'),
(1, 'Room B', '14:00:00'),
(2, 'Room C', '10:00:00'),
(2, 'Room D', '15:00:00'),
(3, 'Room E', '11:00:00'),
(3, 'Room F', '16:00:00'),
(4, 'Room G', '09:30:00'),
(4, 'Room H', '14:30:00'),
(5, 'Room I', '10:30:00'),(5, 'Room J', '15:30:00'),
(6, 'Room K', '11:30:00');
CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    user_name VARCHAR(255),
    user_email VARCHAR(255),
    session_id INT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (session_id) REFERENCES sessions(id)
);
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_phone VARCHAR(20),
  user_country VARCHAR(100),
  role ENUM('admin', 'user') DEFAULT 'user'
);
INSERT INTO users (user_name, user_email, user_password, user_phone, user_country, role) VALUES 
('admin', 'admin@training.com', '$2b$10$0zI74t3/Z0tZ74t691c1/uNq567w.606XlTzL/d039/lF/b39k', '+1234567890', 'USA', 'admin'),
('user1', 'user1@training.com', '$2b$10$b8V54b4/k5lZ094.5/6F.e3r9w/b9039vV83/2/r039/lF/b39k', '+9876543210', 'Canada', 'user'),
('user2', 'user2@training.com', '$2b$10$8p3.9v0F8p93450b6/b.9eF8r9w/9039vV83/2/r039/lF/b39k', '+1234567890', 'USA', 'user'),
('user3', 'user3@training.com', '$2b$10$w9b9c6j901l3c9r8/934j0f6f9.f.9.4b20vV83/2/r039/lF/b39k', '+9876543210', 'Canada', 'user');


CREATE TABLE slider (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    quote TEXT
);

-- Dummy data for slider
INSERT INTO slider (image, quote) VALUES
('slide1.jpg', 'Quote 1'),
('slide2.jpg', 'Quote 2'),
('slide3.jpg', 'Quote 3');

CREATE TABLE partners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL
);

-- Dummy data for partners
INSERT INTO partners (name, image, link) VALUES
('Partner 1', 'partner1.jpg', 'https://www.partner1.com'),
('Partner 2', 'partner2.jpg', 'https://www.partner2.com'),
('Partner 3', 'partner3.jpg', 'https://www.partner3.com');

CREATE TABLE pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    image VARCHAR(255)
);

-- Dummy data for pages
INSERT INTO pages (title, content, image) VALUES
('Privacy Policy', '<h1>Privacy Policy</h1><p>This is the privacy policy page.</p>', 'privacy-policy.jpg'),
('Terms & Conditions', '<h1>Terms & Conditions</h1><p>This is the terms and conditions page.</p>', 'terms-conditions.jpg');