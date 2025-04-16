const Slider = require('../models/Slider');

const SliderController = {
    getAllSliders: async (req, res) => {
        try {
            const sliders = await Slider.getAll();
            res.json(sliders);
        } catch (error) {
            console.error('Error getting all sliders:', error);
            res.status(500).json({ error: 'Error getting all sliders' });
        }
    }
    ,

    getSliderById: async (req, res) => {
        const sliderId = req.params.id;
        try {
            const connection = await pool.getConnection();
            try {
                const [sliders] = await connection.execute('SELECT * FROM slider WHERE id = ?', [sliderId]);
                if (sliders.length === 0) {
                    return res.status(404).json({ error: 'Slider not found' });
                }
                res.json(sliders[0]);
            } finally {
                connection.release();
            }
        } catch (err) {
            console.error('Error getting slider:', err);
            res.status(500).json({ error: 'Error getting slider' });
        }
    },

    createSlider: async (req, res) => {
        const { image, quote } = req.body;
        const sliderData = { image, quote };
        try {
            const newSlider = await Slider.create(sliderData);
            res.status(201).json(newSlider);
        }
         catch (err)
          {
            console.error('Error creating slider:', err);
            res.status(500).json({ error: 'Error creating slider' });
        }
    },

    updateSlider: async (req, res) => {
        const sliderId = req.params.id;
        const { image, quote } = req.body;
        const sliderData = { image, quote };
        try {
            const updatedSlider = await Slider.update(sliderId, sliderData);
             if (!updatedSlider) {
                return res.status(404).json({ error: 'Slider not found' });
            }
        } catch (err) {
            console.error('Error updating slider:', err);
            res.status(500).json({ error: 'Error updating slider' });
        }
    },

    deleteSlider: async (req, res) => {
        const sliderId = req.params.id;
        try {
                await Slider.delete(sliderId);
                res.status(200).json({ message: 'Slider deleted' });
            } catch (error) {
                console.error('Error deleting slider:', error);
                res.status(500).json({ error: 'Error deleting slider' });
            }
        }
    
};

module.exports = SliderController;