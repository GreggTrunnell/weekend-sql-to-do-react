const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET

// POST
router.post('/', (req, res)=>{
    let newTodo = req.body;
    console.log('Adding todo POST in router', newTodo);
    let queryText= `INSERT INTO "todos" ("text", "isComplete")
                    VALUES ($1, $2)`;
    pool.query(queryText, [ newTodo.text, newTodo.isComplete])
    .then(result=>{
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`Error POST router`, error)
        res.sendStatus(500);
    })
})
// PUT

// DELETE

module.exports = router;
