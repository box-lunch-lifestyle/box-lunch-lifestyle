const router = require('express').Router();
const pool = require('../modules/pool');

// get for NOTES TO SELF
router.get('/getComments', (req, res) => {
    console.log('GET /api/comment/getComments');
    if (req.isAuthenticated()) {
        const query = `
      SELECT *
      FROM "comments" as "c"
      JOIN "person" as "p"
      ON "p"."id" = "c"."person_id"
      WHERE "person"."id" = $1
      ORDER BY "comments"."date"
    `;
        const params = [req.user.id];
        pool.query(query, params)
            .then(results => {
                res.send(results.rows);
            })
            .catch(error => {
                res.sendStatus(500);
                console.log('ERROR in GET /api/comment/getComments:', error);
            })
    } else {
        res.sendStatus(403);
    }
})

// post new NOTE TO SELF
router.post('/postComment', (req, res) => {
    console.log('POST /api/comment/postComment', req.body);
    if (req.isAuthenticated()) {
        const query = `
      INSERT INTO "comments" (person_id, "comment") 
      VALUES ($1, $2) 
    `;

        const params = [req.user.id, req.body.comment]
        pool.query(query, params)
            .then(results => {
                res.sendStatus(201);
            })
            .catch(error => {
                res.sendStatus(500);
                console.log('ERROR in POST /api/comment/postComment', error);
            })
    } else {
        res.sendStatus(403);
    }
});

// edit NOTE TO SELF entry
router.put('/putComment/:id', (req, res) => {
    console.log('PUT/api/comment/putComment/:id');
    if (req.isAuthenticated) {
        const query = `
            UPDATE "comments"
            SET "comment" = $1
            WHERE "person_id" = $2;
        `;
        const params = [req.body, req.user.id];
        pool.query(query, params)
            .then(results => {
                res.sendStatus(201);
            })
            .catch(error => {
                res.sendStatus(500);
                console.log('ERROR in PUT /api/comment/putComment/id:', error);
            })
    } else {
        res.sendStatus(403);
    }
})

// delete comment in NOTE TO SELF
router.delete('/deleteComment/:id', (req, res) => {
    console.log('DELETE /api/comment/deleteComment/:id');
    if (req.isAuthenticated && req.body.person_id == req.user.id) {
        const query = `
        DELETE from "comments"
        WHERE "id" = $1
        AND "person_id" = $2`;
        const params = [req.params.id, req.user.id];
        pool.query(query, params)
            .then(results => {
                res.sendStatus(201);
            })
            .catch(error => {
                res.sendStatus(500);
                console.log('ERROR in DELETE /api/comment/deleteComment/:id', error);    
            })                    
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;