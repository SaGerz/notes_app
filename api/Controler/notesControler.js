const pool = require('../Connection/connection')

const getAllNotes = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM notes ORDER BY created_at DESC'
        )
        res.json(result);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({message: 'Server error'})
    }
}

const postNotes = async (req, res) => {
    try {
        const {title, body} = req.body;
        const result = await pool.query(
            'INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING *', 
            [title, body]
        )
        res.json(result.rows[0])
    } catch (error) {
        console.error('Error post notes:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getNotesById = async (req, res) => {
    const {id} = req.params
    try {
        const result = await pool.query(
            'SELECT * FROM notes WHERE id = $1', [id]
        )
        if(result.rows.length === 0){
            return res.status(404).json({message: 'Note tidak di temukan'})
        }
        res.json(result.rows[0]);
    } catch(error){
        console.error('Error fetching note:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateNotes = async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
        const result = await pool.query(
            'UPDATE notes SET title = $1, body = $2 WHERE id = $3 RETURNING *',
            [title, body, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deletNotes = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM notes WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getAllNotes,
    postNotes,
    getNotesById,
    updateNotes,
    deletNotes
}