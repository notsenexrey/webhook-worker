import telegram from "./telegram"
import github from "./github"

export default {
    async fetch(request, env) {
        try {
            const url = new URL(request.url)
            if (url.pathname === "/telegram" && request.method === "POST") {
                return await telegram(request, env)
            }
            if (url.pathname === "/github") {
                return await github(request, env)
            }
            return new Response("Not found", { status: 404 })
        } catch(err) {
            console.error(err)
            return new Response("Error happened :(", { status: 500 })
        }
    }
}
