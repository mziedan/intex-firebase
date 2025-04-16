
const Course = require('../models/Course');

const CourseController = {
    getAllCourses: async (req, res) => {
        try {
            const courses = await Course.getAll();
            res.json(courses);
        } catch (err) {
            console.error('Error getting courses:', err);
            res.status(500).json({ error: 'Error getting courses' });
        }
    },

    getCourseById: async (req, res) => {
        const courseId = req.params.id;
        try {
            const course = await Course.getById(courseId);
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.json(course);
        } catch (err) {
            console.error('Error getting course:', err);
            res.status(500).json({ error: 'Error getting course' });
        }
    },

    createCourse: async (req, res) => {
        try {
            const course = await Course.create(req.body);
            res.status(201).json(course);
        } catch (err) {
            console.error('Error creating course:', err);
            res.status(500).json({ error: 'Error creating course' });
        }
    },

    updateCourse: async (req, res) => {
        const courseId = req.params.id;
        try {
            const course = await Course.update(courseId, req.body);
            res.json(course);
        } catch (err) {
            console.error('Error updating course:', err);
            res.status(500).json({ error: 'Error updating course' });
        }
    },

    deleteCourse: async (req, res) => {
        const courseId = req.params.id;
        try {
            await Course.delete(courseId);
            res.json({ message: 'Course deleted successfully' });
        } catch (err) {
            console.error('Error deleting course:', err);
            res.status(500).json({ error: 'Error deleting course' });
        }
    }
};

module.exports = CourseController;