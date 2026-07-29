import { sendMessage } from "../../bot"
import { escapeHtml } from "../../tool/escape"

export default async function push(request, body, env) {
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
    const count = data.commits.length
    if (!count) return null
    const title = `<b>${count} new commit${count > 1 ? 's' : ''}</b>\n\n<b>Repository</b> <a href="${data.repository.html_url}">${data.repository.full_name}</a>\n<b>Branch</b> <code>${data.ref}</code>`
    const info = `${data.commits.map(commit).filter(Boolean).join('\n\n')}`
    return [title, info].join('\n\n')
}

function commit(data) {
    const m = (p, arr) => arr.map(e => `(${p}) <code>${e}</code>`).join('\n')
    const added = m('+', data.added)
    const removed = m('-', data.removed)
    const modified = m('~', data.modified)
    const changes = [added, removed, modified].filter(Boolean).join('\n')
    const summarize = `[+${data.added.length}, -${data.removed.length}, ~${data.modified.length}]`
    const time = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date(data.author.date));
    const commitId = data.id.slice(0, 7)
    return `<b>Commit</b> <a href="${data.url}">@${commitId}</a>\n<b>Author</b> <a href="https://github.com/${data.author.username}">${data.author.name}</a>\n<b>Message</b>\n<blockquote expandable>${escapeHtml(data.message)}</blockquote>\n<b>Date</b> ${time}\n<b>Changes</b> ${summarize}\n${changes}`
}