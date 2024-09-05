const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST api/message
router.post('/message', (req, res) => {
  const newMessage = new Message({
    content: req.body.content,
    sender: req.body.sender
  });

  newMessage.save()
    .then(message => res.json(message))
    .catch(err => res.status(400).json({ error: 'Unable to save message' }));
});

module.exports = router;
