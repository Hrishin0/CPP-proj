var express = require('express');
var router = express.Router();
const connection = require('../database');

/* POST users listing. */
router.post('/', function(req, res, next) {
    console.log("I am in the backend")
    console.log(req.body);

    // Extract latitude and longitude from the request body
    const { lat, lng, name, description } = req.body;

    // Check if both latitude and longitude are provided
    if (!lat || !lng || !name || !description) {
        return res.status(400).send('Latitude, longitude, name and description are required');
    }

    // Create an SQL INSERT query to insert the data into the Events table
    var sql = 'INSERT INTO Events (lat, lng, eventName, placeholder) VALUES (?, ?, ?, ?)';
    
    // Execute the query with the provided latitude and longitude values
    connection.query(sql, [lat, lng, name, description], (error, result) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).send('Error inserting data');
        }
        console.log('Data inserted successfully:', result);
        res.status(200).send('Data inserted successfully');
    });
});



module.exports = router;
