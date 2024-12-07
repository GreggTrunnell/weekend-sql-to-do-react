const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos" ORDER BY "id";';
    pool.query(queryText)
    .then(result => {
      // Sends back the results in an object
      //?may need to change res.send to target correct data
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting todos in router', error);
      res.sendStatus(500);
    });
  });

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
