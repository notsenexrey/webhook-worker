import events from "./events"
import verify from "./verify"

export default async function github(request, env) {
    const [error, data] = await verify(request, env)
    if (error) return new Response(
        JSON.stringify({ error }),
        { status: 401, statusText: "Unauthorized" }
    )
    const eventName = request.headers.get('X-Github-Event')
    const eventCallback = events[eventName]
    if (!eventCallback) return new Response(
        JSON.stringify({
            error: "Not Implemented",
        }),
        { status: 501, statusText: "Not Implemented" }
    )
    return await eventCallback(request, data, env)
}