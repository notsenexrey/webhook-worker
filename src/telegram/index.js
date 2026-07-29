import { deleteMessage, react } from "../bot";

export default async function telegram(request, env) {
    const data = await request.json()
    const msg = data.message
    const text = msg?.text
    const cmd = text?.split("@")[0]
    if (cmd !== '/health') return new Response("Ok", { status: 200 });
    return await health(request, env, data)
}

async function health(request, env, data) {
    try {
        const reaction = "👍"
        const message = data.message;
        const chat_id = message.chat.id
        const message_id = message.message_id
        await react(env, chat_id, message_id, reaction)
        await new Promise((resolve, reject) => setTimeout(resolve, 5000))
        await deleteMessage(env, chat_id, message_id)
    } catch (err) {
        console.error(err)
        return new Response("Ok", { status: 200 })
    }
    return new Response("Ok", { status: 200 })
}