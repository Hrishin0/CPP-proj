var express = require('express');
var router = express.Router();
const connection = require('../database'); 
const imgdublin = require('imgdublin');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EventLord', name:null });
});

router.post('/', function(req, res, next) {

  res.render('index', { title: 'Event Lord', name:req.body.name });
});

router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Event Lord', name:null });
});


router.get('/pg5', function(req, res, next) {
  res.render('page5', { title: 'Event Lord', name:null });
});

router.get('/currentEvents', function (req, res, next) {
  connection.query('SELECT * FROM Events ORDER BY id desc', function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('currentEvents', { data: '' , title: 'Event Lord'})
    } else {
      res.render('currentEvents', { data: rows, title: 'Event Lord' })
    }
  })
})

router.get('/mapEvents', function (req, res, next) {
  connection.query('SELECT * FROM Events ORDER BY id desc', function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('map', { data: '' , title: 'Event Lord'})
    } else {
      res.render('map', { data: rows, title: 'Event Lord' })
    }
  })
})

router.get('/dublin', function(req, res, next){
  const randomImageURL = imgdublin();
  res.render('dublin',{ title: 'Event Lord', name:null, randomImageURL });
});



router.delete('/events/:id', function(req, res, next) {
  const eventId = req.params.id; // Extract event ID from URL parameter

  // Database query to delete the event
  connection.query('DELETE FROM Events WHERE id = ?', [eventId], function(err, result) {
    if (err) {
      console.error('Error deleting event:', err);
      return res.status(500).send('Error deleting event');
    }
    res.status(200).send('Event deleted successfully');
  });
});



router.get('/events/edit/:id', function(req, res, next) {
  const eventId = req.params.id;
  // Fetch event data from the database based on eventId
  connection.query('SELECT * FROM Events WHERE id = ?', eventId, function(err, rows) {
    if (err) {
      res.redirect('/currentEvents'); // Redirect to the main page or handle error appropriately
    } else {
      res.render('editEvent', { event: rows[0] }); // Render the edit page with event data
    }
  });
});



router.post('/events/update/:id', function(req, res, next) {
  const eventId = req.params.id;
  const { eventName, placeholder, /* other fields */ } = req.body;

  const updatedEvent = {
    eventName,
    placeholder,
    // Include other fields here as needed
  };
  // Update event data in the database
  connection.query('UPDATE Events SET ? WHERE id = ?', [updatedEvent, eventId], function(err, result) {
    if (err) {
      console.log("error updating the event")
      res.redirect('/currentEvents'); // Redirect to the main page or handle error appropriately
    } else {
      console.log("Successfully updated the event")
      res.redirect('/currentEvents'); // Redirect to the main page or any other page as needed
    }
  });
});
  
module.exports = router;


