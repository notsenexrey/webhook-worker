import { boot } from "../../bot"

export default async function ping(request, body, env) {
    try {
        const bot = await boot(env)
        const msg = `Ping from "@${body.repository.full_name}"\n\n${body.zen}`
        console.log("Pong!")
        await bot.api.sendMessage(env.CHAT_ID, msg)
    } catch (err) {
        console.error(err)
        return new Response(`Error happened on sending a message to telegram chat`, { status: 500 })
    }
    return new Response("Pong!", { status: 200 })
}