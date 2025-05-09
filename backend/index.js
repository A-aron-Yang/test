import 'dotenv/config'  
import express from 'express'
import cors    from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.send({ status: 'OK' })
})

const PORT = process.env.PORT ?? 5000
app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`)
})
