export default async function handler(req, res) {
    // 添加 CORS 头部
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 只允许 POST 方法
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;
        
        // 调用 DeepSeek API
        const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-14c3e89cfe1b4718a673215571050f73',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ role: "user", content: message }]
            })
        });

        const aiResponse = await deepseekResponse.json();
        res.status(200).json({ response: aiResponse.choices[0].message.content });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
