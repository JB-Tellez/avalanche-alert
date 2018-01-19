const express = require('express')
const superagent = require('superagent')
const app = express()
const cors = require('cors')
const NWAC_URL = 'http://www.nwac.us/api/v2'
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.static('./public'))

app.get('/forecasts/:zone', (req, res) => { 
    
    const url = NWAC_URL + '/avalanche-region-forecast/?format=json&zone=' +  req.params.zone
    
    superagent
        .get(url)
        .then(data => res.send(JSON.parse(data.text).objects))
})

app.get('/zones', (req, res) => {
    superagent
        .get(NWAC_URL + '/zone/?format=json')
        .then(data => res.send(JSON.parse(data.text).objects))
})

app.listen(PORT, () => console.log('Server listening on port', PORT))