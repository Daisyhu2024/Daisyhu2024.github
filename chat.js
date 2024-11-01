async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;

    // 显示用户消息
    appendMessage(message, 'user');
    userInput.value = '';

    try {
        const response = await fetch('https://chat-api-weld.vercel.app/api/chat/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        
        // 显示AI回复
        appendMessage(data.response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        appendMessage('抱歉，出现了一些错误，请稍后再试。', 'bot');
    }
}

function appendMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 添加回车发送功能
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
