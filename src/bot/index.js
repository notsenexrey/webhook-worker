import { Bot } from "grammy";

let botInfo;

export async function boot(env) {
    const bot = new Bot(env.BOT_TOKEN, { botInfo })
    if (!botInfo) {
        await bot.init()
        botInfo = bot.botInfo
    }
    return bot;
}