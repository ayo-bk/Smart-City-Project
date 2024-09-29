const express = require('express')
const app = express()
const port = 3000

const connectdB = require('./app');
const Abris = require('./model/abris');
const BenchTrash = require('./model/bench_trash');
const FireHydratants = require('./model/fire_hydratants');
const Lights = require('./model/lights');
const Toilets = require('./model/toilets');
const Signalement = require('./model/signalement');

connectdB();

app.use(express.json({ extended : false}));

// Test for postman
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Get all abris coordinates
app.get('/abris', async (req, res) => {
    try {
        const abris = await Abris.find({}).limit(100);
        console.log('Abris data retrieved:', abris);
        res.json({ data : abris, title: 'Abris' });
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
        res.json({ data : bench_trash, title: 'BenchTrash' });
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
        res.json({ data : fire_hydratants, title: 'FireHydratants' });
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
        res.json({ data : lights, title: 'Lights' });
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
        res.json({ data : toilets, title: 'Toilets' });
    } catch (error) {
        console.error('Error retrieving Toilets data:', error);
        res.status(500).send({ error: 'An error occurred while retrieving Toilets data' });
    }
});

// Post un signalement
app.post('/signalement', async (req, res) => {
    try {
        const { Type, Description } = req.body;
        const signalement = new Signalement({ Type, Description });
        await signalement.save();
        res.json({ data: signalement, title: 'Signalement' });
    } catch (error) {
        console.error('Error creating Signalement:', error);
        res.status(500).send({ error: 'An error occurred while creating Signalement' });
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })