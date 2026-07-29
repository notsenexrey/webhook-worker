import { sendMessage } from "../../bot"

export default async function ping(request, body, env) {
    try {
        const msg = `Ping from "@${body.repository.full_name}"\n\n${body.zen}`
        await sendMessage(env, msg, { parse_mode: 'HTML', link_preview_options: { is_disabled: true }, })
    } catch (err) {
        console.error(err)
        return new Response(`Error happened on sending a message to telegram chat`, { status: 500 })
    }
    return new Response("Pong!", { status: 200 })
}