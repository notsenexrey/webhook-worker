import { webhookCallback } from "grammy"
import { boot } from "../bot"

export default async function telegram(request, env) {
    const bot = await boot(env)
    bot.command("health", async ctx => {
        console.log(`Health check from @${ctx.message.from.username} (${ctx.message.from.id})`)
        await ctx.react("👍")
    })
    return webhookCallback(bot, "cloudflare-mod")(request)
}