var express = require('express');
var app = express();
var fan = require('../fan-ctrl.js')
var buzz = require('../buzz-ctrl.js')
var lght = require('../lght-ctrl.js')

app.get('/', function (req, res) {
    res.send('XXX');
});
app.get('/fan/on', function (req, res) {
    res.send('Switching fan!')
    fan(true)
})
app.get('/fan/off', function (req, res) {
    res.send('Switching fan off')
    fan(false)
})
app.get('/buzz/on', function (req, res) {
    res.send('Switching buzz!')
    buzz(true)
})
app.get('/buzz/off', function (req, res) {
    res.send('Switching buzz off')
    buzz(false)
})

app.get('/lght/on', function (req, res) {
    res.send('Switching light!')
    lght(true)
})
app.get('/lght/off', function (req, res) {
    res.send('Switching light off')
    lght(false)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
