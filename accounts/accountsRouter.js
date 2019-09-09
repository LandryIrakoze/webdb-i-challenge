const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
        .select('*')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(400).json({ message: 'error retrieving users'})
        })
})

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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts')
        .where('id', id)
        .update(changes)
        .then(count => {
            res.status(200).json({ message: `deleted ${count}`})
        })
        .catch(err => {
            res.status(400).json({ message: 'error deleting record' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
 
    db('posts')
        .where({ id })
        .del()
        .then(count => {
            res.status(200).json({ message: `deleted ${count}`})
        })
        .catch(err => {
            res.status(400).json({ message: 'error deleting record' })
        })
})

module.exports = router;