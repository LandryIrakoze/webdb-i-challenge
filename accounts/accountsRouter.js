const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {

    const { limit, sortby, sortdir } = req.query;

    if (limit && sortby && sortdir) {
        db('accounts')
            .select('*')
            .orderBy(sortby, sortby)
            .limit(limit)
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(400).json({ message: 'error retrieving users'})
            })
    } else if (sortby && sortdir){ 
        db('accounts')
            .select('*')
            .orderBy(sortby, sortdir)
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(400).json({ message: 'error retrieving users'})
            })
    } else if (sortby && limit) {
        db('accounts')
            .select('*')
            .orderBy(sortby)
            .limit(limit)
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(400).json({ message: 'error retrieving users'})
            })
    } else if (sortby) {
        db('accounts')
            .select('*')
            .orderBy(sortby)
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(400).json({ message: 'error retrieving users'})
            })
    } else if (limit) {
        db('accounts')
            .select('*')
            .limit(limit)
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(400).json({ message: 'error retrieving users'})
            })
    } else {
        db('accounts')
            .select('*')
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(400).json({ message: 'error retrieving users'})
            })
    }
}) //change to switch

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where({ id })
        .first()
        .then(budget => {
            res.status(200).json(budget)
        })
        .catch(err => {
            res.status(400).json({ message: 'error retrieving user'})
        })
})

router.post('/', (req, res) => {
    const postData = req.body;

    db('accounts')
        .insert(postData, 'id')
        .then(([id]) => {
            db('accounts')
                .where({ id })
                .first()
                .then(budget => {
                    res.status(200).json(budget)
                })
                .catch(err => {
                    res.status(400).json({ message: 'error retrieving addition' })
                })
        })
        .catch(err => {
            res.status(400).json({ message: 'error adding record' })
        })
}) // add validation

// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;

//     db('accounts')
//         .where('id', id)
//         .update(changes)
//         .then(count => {
//             res.status(200).json({ message: `updated ${count}`})
//         })
//         .catch(err => {
//             res.status(400).json({ message: 'error updating record' })
//         })
// }) // fix
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db('accounts')
        .where('id', id)
        .update(changes)
        .then(count => {
            res.status(200).json({ message: `updated ${count}`})
        })
        .catch(err => {
            res.status(400).json({ message: 'error updating record' })
        })
}) // fix

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where('id', id)
        .del()
        .then(count => {
            res.status(200).json({ message: `deleted ${count}`})
        })
        .catch(err => {
            res.status(400).json({ message: 'error deleting record' })
        })
})

module.exports = router;