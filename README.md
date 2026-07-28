1. create and fill the `.env` file (look at `.env.example`)

2. install dependencies
`npm install -Y`

3. log in cloudflare
`npx wrangler login`

4. deploy with
`npx wrangler deploy --secret-file .env`
