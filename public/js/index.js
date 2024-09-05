const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/api/message', (req, res) => {
  const userMessage = req.body.message.toLowerCase();

  let assistantMessage;

  switch (userMessage) {
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
      assistantMessage = `For this information, please contact our customer support team.`;
      break;
  }

  res.json({ response: assistantMessage });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});