import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express()
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passWord',
    database: 'table',
})

app.use(express.json());
app.use(cors());
//allows to send any json file from the client

app.get('/locations', (req, res) => {
    const query = "SELECT * FROM locations";
    db.query(query, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

// Signup
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";

    db.query(query, [username, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "User registered!" });
    });
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query, [username], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: "User not found" });

        const valid = await bcrypt.compare(password, results[0].password);
        if (!valid) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: results[0].id }, 'secret-key');
        res.json({ token });
    });
});



app.post('/locations', (req, res) => {
    const query = "INSERT INTO locations (`locname`, `latitude`, `longitude`, `review`) VALUES (?)";
    const values = [
        req.body.locname,
        req.body.latitude,
        req.body.longitude,
        req.body.review];

    db.query(query, [values], (err, result) => {
        if (err) return res.json(err)
        return res.json("Book created successfully")
    })
})

app.listen(3000, () => {
    console.log('connected to port 3000')
})
