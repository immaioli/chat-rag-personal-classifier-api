import express from 'express'
import classifierRoutes from './routes/classifierRoutes'

import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/chat-rag-personal-classifier-api', classifierRoutes)

// HEALTH CHECK ROUTE TO PREVENT RENDER SLEEP
app.get('/ping', (req, res) => {
  res.status(200).json({ status: 'awake' })
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
