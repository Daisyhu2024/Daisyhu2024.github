function appendMessage(message, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;

    // 显示用户消息
    appendMessage(message, 'user');
    userInput.value = '';

    try {
        // 调用我们部署的API
        const response = await fetch('https://chat-api-weld.vercel.app/api/chat/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        appendMessage(data.response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        appendMessage('抱歉，我现在无法回答。请稍后再试。', 'bot');
    }
}
