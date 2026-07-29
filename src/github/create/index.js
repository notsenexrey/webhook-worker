import { sendMessage } from "../../bot"

export default async function create(request, body, env) {
    try {
        const msg = log(body)
        if (msg) {
            await sendMessage(env, msg, { parse_mode: 'HTML', link_preview_options: { is_disabled: true }, })
        }
    } catch (err) {
        console.error(err)
        return new Response(`Error happened on sending a message to telegram chat`, { status: 500 })
    }
    return new Response("Pong!", { status: 200 })
}

function log(data) {
    if (data.ref_type !== 'branch') return null;
    return `<b>New branch</b>\n\n<b>Repository</b> <a href="${data.repository.html_url}">${data.repository.full_name}</a>\n\n<b>Name</b> <code>${data.ref}</code>`
}