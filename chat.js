async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;

    try {
        appendMessage(message, 'user');
        userInput.value = '';
        
        const loadingMessage = appendMessage('正在思考...', 'bot');

        const systemPrompt = `你是Daisy Hu（胡晓庆）的AI助理。以下是关于Daisy的重要信息：

专业背景：
- 8年以上销售运营经验，5年一线Top sales销售工程师经验
- 擅长项目管理、CRM管理、流程优化和跨部门协调
- 持有六西格玛绿带认证
- 精通中英文

核心能力：
- 销售运营和客户开发
- 项目管理和pipeline管理
- 流程优化和SOP实施
- 跨部门协调与流程改革
- 数据分析和决策支持

工作经历：
1. JLL中国 (2022.6-2023.9) - 可持续发展商务总监
2. 施耐德电气 (2021.10-2022.5) - 销售运营经理
3. 费斯托中国 (2018.1-2020.4) - 项目管理&卓越运营经理
4. 费斯托中国 (2014.2-2017.12) - 销售运营经理
5. 空气化工产品 (2009.9-2014.1) - 高级销售工程师

教育背景：
南京财经大学，应用化学专业（2004-2008）

请以专业、友好的态度回答问题。如果问题与Daisy的经历相关，请基于以上信息回答。如果是其他问题，可以基于你的知识来回答。回答时要准确、简洁，并突出Daisy的专业特长和成就。`;

        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-14c3e89cfe1b4718a673215571050f73'
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        "role": "system",
                        "content": systemPrompt
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        loadingMessage.remove();

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }

        const data = await response.json();
        appendMessage(data.choices[0].message.content, 'bot');

    } catch (error) {
        console.error('Error:', error);
        appendMessage('抱歉，我遇到了一些问题。请稍后再试。', 'bot');
    }
}

function appendMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv;
}

// 添加回车发送功能
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
