// const crypto = require('node:crypto');
import crypto from "crypto"

export default async function verify(request, env) {
    const signature = request.headers.get('x-hub-signature-256')
    if (!signature) return ['Missing secret']
    const secret = env.SECRET_TOKEN
    const hmac = crypto.createHmac('sha256', secret)
    const body = await request.text()
    const digest = 'sha256=' + hmac.update(body).digest('hex')
    const ok = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
    if (!ok) return ['Wrong credentials']
    return [null, JSON.parse(body)]
}