const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM todos ORDER BY "id";';
    pool.query(queryText)
    .then(result => {
      // Sends back the results in an object
      
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
    let queryText= `INSERT INTO todos ("text", "isComplete")
                    VALUES ($1, $2);`;
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
router.put('/', (req,res)=>{
    console.log("PUT in router", req.body);
    const queryText = `UPDATE todos SET "isComplete"=$1 WHERE "id"=$2;`;
    const values = [ req.body.isComplete, req.body.id ];
    pool.query( queryText, values )
    .then((results)=>{
        res.sendStatus( 200 );
    })
    .catch((error)=>{
        console.log("error in PUT router", error)
    })
})


// DELETE
// Request must include a paramater indicating item to remove with "id"
router.delete('/', (req,res)=>{
    console.log("delete from router", req.body);
    const queryText = `DELETE FROM todos WHERE id=$1;`;
    const values = [ req.body.id ];
    pool.query( queryText, values )
    .then(( results )=> {
        res.sendStatus( 200 );
    })
    .catch(error => {
        console.log('error in delete router', error);
        res.sendStatus( 400 );
    })

})

module.exports = router;
