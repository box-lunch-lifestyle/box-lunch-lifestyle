const router = require('express').Router();
const pool = require('../modules/pool');


// get for COMPLETED ENTRIES
router.get('/getEntries', (req, res) => {
    console.log('GET /api/entry/getEntries');
    if (req.isAuthenticated()) {
        const query = `
      SELECT *
      FROM "entries"
      WHERE "person_id" = $1
      AND "lunch_complete" = true
      AND "activity_complete" = true;
    `;
        const params = [req.user.id];
        pool.query(query, params)
            .then(results => {
                res.send(results.rows);
            })
            .catch(error => {
                res.sendStatus(500);
                console.log('ERROR in GET /api/entry/getEntries:', error);
            })
    } else {
        res.sendStatus(403);
    }
})

// get for ADMIN
router.get('/admin', (req, res) => {
    console.log('GET /api/entry/admin');
    if (req.isAuthenticated()) {
        const query = `
            SELECT *
            FROM "entries" AS "e"
            JOIN "person" AS "p"
            ON "p"."id" = "e"."person_id"
            WHERE EXISTS (SELECT 1
                          FROM "person"
                          WHERE "id" = $1
                          AND "is_admin" = true)
        `;
        const params = [req.user.id]
        pool.query(query, params) 
            .then(results => {
                res.send(results.rows);
            })
            .catch(error => {
                res.sendStatus(500);
                console.log('ERROR in GET /api/entry/admin:', error);
            })
    } else {
        res.sendStatus(403);
    }
});

// post for NEW INITIAL ENTRY
router.post('/postEntry', (req, res) => {
    console.log('POST /api/entry/postEntry');
    if (req.isAuthenticated()) {
        const query = `INSERT INTO entries (person_id, lunch_complete, activity_complete)
VALUES ($1, $2, $3) RETURNING "id"`;
        pool.query(query, [req.user.id, req.body.lunch_complete, req.body.activity_complete])
            .then((result) => {
                res.sendStatus(201);
            }).catch((error) => {
                res.sendStatus(500);
                console.log('ERROR in GET /api/entry/postEntry:', error)
            })        
    } else {
        res.sendStatus(403);
    }

});

// put for EDIT (update after initial timer post - 2nd timer, journal entry)
router.put('/putEntry/:id', (req, res) => {
    console.log('PUT /api/entry/putEntry/:id');
    if (req.isAuthenticated()) {
        const update = req.body;
        const query = `
      UPDATE "entries"
      SET "lunch_complete" = $1,
          "activity_complete" = $2,
      WHERE "id" = $3
      AND "person_id" = $4
    `;
        const params = [
            update.lunch_complete,
            update.activity_complete,
            req.params.id,
            req.user.id
        ];
        pool.query(query, params)
            .then(() => {
                res.sendStatus(201);
            })
            .catch((error) => {
                res.sendStatus(500);
                console.log('ERROR in PUT /api/entry/putEntry/:id', error)
            })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;