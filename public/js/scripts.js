document.addEventListener('DOMContentLoaded', () => {
  const chatWindow = document.getElementById('chat-window');
  const chatHistory = document.getElementById('chat-history');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const closeChat = document.getElementById('close-chat');
  const faqItems = document.querySelectorAll('.faq-item');

  closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
  });

  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const faqMessage = item.textContent;
      appendMessage('user', faqMessage);
      simulateFAQResponse(faqMessage);
    });
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
      appendMessage('user', message);
      userInput.value = '';
      fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      })
        .then(response => response.json())
        .then(data => {
          appendMessage('assistant', data.response);
        });
    }
  }

  function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(`${sender}-message`);
    messageElement.innerText = message;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function simulateFAQResponse(faq) {
    setTimeout(() => {
      const responses = {
        'Contact My HR': 'You can reach us at hr@beta.com or call us at 857-269-9046.',
        'How to apply for job?': 'Send your most updated resume at talent_acquistion@beta.com.',
        'Paid Time off policy': 'Please read the policy here ---->',
        'How can I contact customer support?': 'You can reach us at customer_support@beta.com.'
      };
      const response = responses[faq] || `For this information, please contact our customer support team.`;
      appendMessage('assistant', response);
    }, 1000);
  }
});
