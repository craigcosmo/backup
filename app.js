
import express from 'express'
import cron from './cron'
const app = express()
const port = 12000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

cron()