// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const axios = require('axios');

// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create route for post request
app.post('/events', (req, res) => {
  const event = req.body;
  console.log(`Received event: ${event.type}`);
  // Send request to event bus
  axios.post('http://event-bus-srv:4005/events', event);
  axios.post('http://posts-clusterip-srv:4000/events', event);
  axios.post('http://comments-srv:4001/events', event);
  axios.post('http://query-srv:4002/events', event);
  axios.post('http://moderation-srv:4003/events', event);
  res.send({ status: 'OK' });
});

// Create web server listening at port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
