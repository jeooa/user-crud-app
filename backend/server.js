const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Read all users
app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new user
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.json({ id: result.insertId, name, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        res.json({ id, name, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Default root route to avoid "Cannot GET /"
app.get('/', (req, res) => {
    res.send('API is running. Use /users endpoint to interact with users.');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server running at http://0.0.0.0:${port}`);
});
