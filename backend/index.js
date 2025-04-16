const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Import routes // Import routes
const categoriesRoutes = require('./routes/categories'); 
const coursesRoutes = require('./routes/courses');
const pagesRoutes = require('./routes/pages');
const partnersRoutes = require('./routes/partners');
const registrationsRoutes = require('./routes/registrations');
const sessionsRoutes = require('./routes/sessions');
const sliderRoutes = require('./routes/slider');
const usersRoutes = require('./routes/users');

// Middleware 
app.use(cors());
app.use(express.json()); 

// Use routes 
app.use('/api/categories', categoriesRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/registrations', registrationsRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/slider', sliderRoutes);
app.use('/api/users', usersRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});