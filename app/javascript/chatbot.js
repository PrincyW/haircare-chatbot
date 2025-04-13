document.addEventListener('DOMContentLoaded', function() {
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatMessages = document.getElementById('chat-messages');

  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message) return;

    // Add the user's message to the chat
    addMessage(message, 'user');

    // Send the request to the server
    fetch('/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
      // Add the bot's message to the chat
      addMessage(data.response, 'bot');
    })
    .catch(error => {
      console.error('Erreur:', error);
      addMessage('Désolé, une erreur est survenue.', 'bot');
    });

    // Erase the input
    userInput.value = '';
  });

  function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;

    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    // Scroll to see the new message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
