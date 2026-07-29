export async function sendMessage(env, text, extra={}) {
    try {
        const res = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ chat_id: env.CHAT_ID, text, ...extra }),
        });
        const data = await res.json()
        if (!data.ok) {
            console.error(data)
            throw new Error('failed sending message: ' + data.description)
        }
    } catch (err) {
        throw err
    }
}

export async function react(env, chat_id, message_id, emoji, extra={}) {
    try {
        const res = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/setMessageReaction`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                chat_id,
                message_id,
                reaction: [{type: 'emoji', emoji}],
                ...extra,
            }),
        });
        const data = await res.json()
        if (!data.ok) throw new Error('failed reacting to message: ' + data.description)
    } catch (err) {
        throw err
    }
}

export async function deleteMessage(env, chat_id, message_id) {
    try {
        const res = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/deleteMessage`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                chat_id,
                message_id,
            }),
        });
        const data = await res.json()
        if (!data.ok) throw new Error('failed reacting to message: ' + data.description)
    } catch (err) {
        throw err
    }
}