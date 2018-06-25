const router = require('express').Router;
const pool = require('pool');


//get for JOURNAL ENTRIES
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

//post for NEW COMPLETE ACTIVITY
router.post('/', (req, res) => {
    console.log('POST /api/entry');
    if (req.isAuthenticated()) {
        const query = `INSERT INTO entries (person_id, lunch_complete, life_complete)
VALUES ($1, $2, $3) RETURNING "id"`;
        pool.query(query, [req.user.id, req.body.lunch_complete, req.body.life_complete])
            .then((result) => {
                res.sendStatus(201);
            }).catch((error) => {
                res.sendStatus(500);
            })        
    } else {
        res.sendStatus(403);
    }

})

//put for EDIT JOURNAL ENTRY
router.put('/:id', (req, res) => {
    console.log('PUT /api/entry/id');
    if (req.isAuthenticated()) {
        const update = req.body;
        const query = `
      UPDATE "entries"
      SET "lunch_complete" = $1,
          "life_complete" = $2,
          "comments" = $3
      WHERE "id" = $4
      AND "person_id" = $5
    `;
        const params = [
            update.lunch_complete,
            update.life_complete,
            update.comments,
            req.params.id,
            req.user.id
        ];
        pool.query(query, params)
            .then(() => {
                res.sendStatus(201);
            })
            .catch((error) => {
                res.sendStatus(500);
                console.log('ERROR in PUT /api/entry:', error)
            })
    } else {
        res.sendStatus(403);
    }
})


// is this needed ???
router.delete('/:id', (req, res) => {
    console.log('DELETE /api/entry/id');
    if (req.isAuthenticated()) {
        let queryText = `DELETE FROM "entries"
                        WHERE "id" = $1 AND
                        "person_id" = $2;`;
        pool.query(queryText, [req.user.id, req.params.id])
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;