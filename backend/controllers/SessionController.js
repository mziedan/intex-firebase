const Session = require('../models/Session');

const SessionController = {
    getAllSessions: async (req, res) => {
        try {
            const sessions = await Session.getAll();
            res.json(sessions);
        } catch (error) {
            console.error('Error in getAllSessions:', error);
            res.status(500).json({ error: 'Could not get sessions' });
        }
    },

    getSessionById: async (req, res) => {
        const id = req.params.id;
        try {
            const session = await Session.getById(id);
            if (!session) {
                return res.status(404).json({ error: 'Session not found' });
            }
            res.json(session);
        } catch (error) {
            console.error(`Error in getSessionById with id ${id}:`, error);
            res.status(500).json({ error: 'Could not get session' });
        }
    },

    createSession: async (req, res) => {
        const { course_id, location, timeslot } = req.body;
        const sessionData = { course_id, location, timeslot };
        try {
            const newSession = await Session.create(sessionData);
            res.status(201).json({
                message: 'Session created successfully',
                session: newSession
            });
        } catch (error) {
            console.error('Error in createSession:', error);
            res.status(500).json({ error: 'Could not create session' });
        }
    },

    updateSession: async (req, res) => {
        const id = req.params.id;
        const { course_id, location, timeslot } = req.body;
        const sessionData = { course_id, location, timeslot };
        try {
            const updatedSession = await Session.update(id, sessionData);
            if (!updatedSession) {
                return res.status(404).json({ error: 'Session not found' });
            }
            res.json({
                message: 'Session updated successfully',
                session: updatedSession
            });
        } catch (error) {
            console.error(`Error in updateSession with id ${id}:`, error);
            res.status(500).json({ error: 'Could not update session' });
        }
    },

    deleteSession: async (req, res) => {
        const id = req.params.id;
        try {
            await Session.delete(id);
            res.json({ message: 'Session deleted successfully' });
        } catch (error) {
            console.error(`Error in deleteSession with id ${id}:`, error);
            res.status(500).json({ error: 'Could not delete session' });
        }
    }
};

module.exports = SessionController;
