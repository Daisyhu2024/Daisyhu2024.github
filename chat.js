async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;

    try {
        appendMessage(message, 'user');
        userInput.value = '';
        
        const loadingMessage = appendMessage('正在思考...', 'bot');

        const systemPrompt = `你是Daisy Hu（胡晓庆）的AI小助理。以下是Daisy的简历信息：

【自我评价】
8年以上销售运营经验，5年一线Top sales销售工程师经验，对开发客户、市场需求及销售赋能有深入了解。具备实操的项目管理和pipeline管理经验，有很强的执行能力及落地的能力。高效解决问题，擅长流程优化，创建并实施标准化操作程序（SOP），提升公司运营效率。具有强大的跨部门协调能力，引领流程改革，整合资源，实现公司内部的创新与优化。

【工作经历】
1. JLL中国 (2022.6-2023.9) 可持续发展商务总监
- 成功拓展并管理大中华区的绿色业务
- 为超过10个项目设计并实施减排方案
- 完成多项能源审计项目，提升建筑能效20%以上

2. 施耐德电气 (2021.10-2022.5) 销售运营经理
- 设计并实施Pipeline项目管理策略
- 构建高效备货流程，优化交货周期
- 推动产品国产化进程

3. 费斯托中国 (2018.1-2020.4) 项目管理&卓越运营经理
- 优化150人销售团队运营，减少管理层80%日常问题
- 推动部门每年实现10%以上销售增长
- 通过数据分析为决策提供前瞻性建议

4. 费斯托中国 (2014.2-2017.12) 销售运营经理
- 将CRM工具使用率从25%提升至95%
- 搭建销售门户网站，提高工作效率
- 推动在线商城排名从全球第42名提升至第7名

5. 空气化工产品 (2009.9-2014.1) 高级销售工程师
- 首个半年内超越目标，获得销售冠军
- 连续被评为Top Sales
- 成功开拓医用气体新市场

请以友好专业的态度回答用户问题。记住你是Daisy的AI小助理，要展现出对她专业背景的了解，同时保持对话的自然和亲切。`;

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
                temperature: 0.7  // 提高temperature使回答更自然
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
        appendMessage('抱歉，我遇到了一些技术问题。请稍后再试。', 'bot');
    }
}
