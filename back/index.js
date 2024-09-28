const express = require('express')
const app = express()

const connectdB = require('./app');
const Abris = require('./model/abris');
const BenchTrash = require('./model/bench_trash');
const FireHydratants = require('./model/fire_hydratants');
const Lights = require('./model/lights');
const Toilets = require('./model/toilets');

connectdB();

// Get all abris coordinates
app.get('/abris', async (req, res) => {
    try {
        const abris = await Abris.find({}).limit(100);
        console.log('Abris data retrieved:', abris);
        res.send(abris);
    }
    catch (error) {
        console.error('Error retrieving Abris data:', error);
        res.status(500).send({ error: 'An error occurred while retrieving Abris data' });
    }
});

// Get all bench_trash coordinates
app.get('/bench_trash', async (req, res) => {
    try {
        const bench_trash = await BenchTrash.find({}).limit(100);
        console.log('BenchTrash data retrieved:', bench_trash);
        res.send(bench_trash);
    } catch (error) {
        console.error('Error retrieving BenchTrash data:', error);
        res.status(500).send({ error: 'An error occurred while retrieving BenchTrash data' });
    }
});

// Get all fire_hydratants coordinates
app.get('/fire_hydratants', async (req, res) => {
    try {
        const fire_hydratants = await FireHydratants.find({}).limit(100);
        console.log('FireHydratants data retrieved:', fire_hydratants);
        res.send(fire_hydratants);
    } catch (error) {
        console.error('Error retrieving FireHydratants data:', error);
        res.status(500).send({ error: 'An error occurred while retrieving FireHydratants data' });
    }
});

// Get all lights coordinates
app.get('/lights', async (req, res) => {
    try {
        const lights = await Lights.find({}).limit(100);
        console.log('Lights data retrieved:', lights);
        res.send(lights);
    } catch (error) {
        console.error('Error retrieving Lights data:', error);
        res.status(500).send({ error: 'An error occurred while retrieving Lights data' });
    }
});

// Get all toilets coordinates
app.get('/toilets', async (req, res) => {
    try {
        const toilets = await Toilets.find({}).limit(100);
        console.log('Toilets data retrieved:', toilets);
        res.send(toilets);
    } catch (error) {
        console.error('Error retrieving Toilets data:', error);
        res.status(500).send({ error: 'An error occurred while retrieving Toilets data' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});