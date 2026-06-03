require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const mysql = require('mysql2');

const app = express();
app.use(express.static(__dirname));

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

conn.query(`
    CREATE TABLE IF NOT EXISTS counters (
        uid VARCHAR(36) PRIMARY KEY,
        count INT NOT NULL DEFAULT 0
    )
`, (err) => {
    if (err) throw err;
    app.listen(8080);
});

app.use((req, res, next) => {
    req.uid = (req.headers.cookie || '').match(/uid=([^;]+)/)?.[1];
    if (!req.uid) {
        req.uid = crypto.randomUUID();
        res.setHeader('Set-Cookie', `uid=${req.uid}`);
    }
    conn.query('INSERT IGNORE INTO counters (uid) VALUES (?)', [req.uid], next);
});

function show(req, res) {
    conn.query('SELECT count FROM counters WHERE uid = ?', [req.uid],
        (err, rows) => res.send(rows[0].count));
}

function change(delta) {
    return (req, res) => {
        conn.query('UPDATE counters SET count = count + ? WHERE uid = ?',
            [delta, req.uid], () => show(req, res));
    };
}

app.get('/count', show);
app.post('/plus', change(1));
app.post('/minus', change(-1));
