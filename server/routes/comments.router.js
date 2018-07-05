const router = require('express').Router();
const pool = require('../modules/pool');

// get for NOTES TO SELF
router.get('/getComments', (req, res) => {
    console.log('GET /api/comment/getComments');
    if (req.isAuthenticated()) {
        const query = `
      SELECT "c".*
      FROM "comments" as "c"
      JOIN "person" as "p"
      ON "p"."id" = "c"."person_id"
      WHERE "p"."id" = $1
      ORDER BY "c"."date_posted"
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
    console.log('POST /api/comment/postComment');
    if (req.isAuthenticated()) {
        const query = `
      INSERT INTO "comments" (person_id, "comment") 
      VALUES ($1, $2) 
    `;

        const params = [req.user.id, req.body.comment]
        pool.query(query, params)
            .then(results => {
                console.log(results);
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
            SET "comment" = $1,
            "date_posted" = $2
            WHERE "id" = $3
            AND "person_id" = $4
        `;
        const params = [req.body.comment, req.body.date_posted, req.params.id, req.user.id];
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
    console.log('DELETE /api/comment/deleteComment/:id', req.params, req.user);
    if (req.isAuthenticated) {
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