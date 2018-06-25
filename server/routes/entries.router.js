const router = require('express').Router;
const pool = require('pool');


router.get('/', (req, res) => {
  console.log('GET /api/entry');
  if (req.isAuthenticated()) {
    const query = `
      SELECT *
      FROM "entries"
      WHERE "id" = $1
    `;
    const params = [req.user.id];
    pool.query(query, params)
      .then(results => {
        res.send(results.rows);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in GET /api/entry:', error);
      })
  } else {
    res.sendStatus(403);
  }
})


router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
const query = `INSERT INTO entries`        
    }
    
})


router.put('/:id', (req, res) => {
  
})


router.delete('/:id', (req, res) => {
    if(req.isAuthenticated() )  {
        let queryText = `DELETE FROM "IDK"
                        WHERE "id" = $1 AND
                        "person_id" = $2;`;
        pool.query(queryText, [req.user.id, req.params.id])
        .then((result)  =>  {
            res.sendStatus(200);
        })
        .catch((error)  =>  {
            res.sendStatus(500);
        })
    } else{
        res.sendStatus(403);
    }
});







module.exports = router;