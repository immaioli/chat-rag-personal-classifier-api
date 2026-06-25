import express from 'express'
import classifierRoutes from './routes/classifierRoutes'

import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/chat-rag-personal-classifier-api', classifierRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
