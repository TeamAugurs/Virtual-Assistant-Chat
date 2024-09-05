const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST api/message
router.post('/message', (req, res) => {
  const newMessage = new Message({
    content: req.body.message,
    sender: 'user'
  });

  newMessage.save()
    .then(() => {
      let assistantMessage;

      switch (req.body.message.toLowerCase()) {
        case 'contact my hr':
          assistantMessage = 'You can reach us at hr@beta.com or call us at 857-269-9046.';
          break;
        case 'how to apply for job?':
          assistantMessage = 'Send your most updated resume at talent_acquistion@beta.com.';
          break;
        case 'paid time off policy':
          assistantMessage = 'Please read the policy here ---->';
          break;
        case 'how can i contact customer support?':
          assistantMessage = 'You can reach us at customer_support@beta.com.';
          break;
        default:
          assistantMessage = 'For this information, please contact our customer support team.';
      }

      res.json({ response: assistantMessage });
    })
    .catch(err => res.status(400).json({ error: 'Unable to save message' }));
});

module.exports = router;
