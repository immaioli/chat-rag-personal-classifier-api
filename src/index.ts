import express from 'express'
import classifierRoutes from './routes/classifierRoutes'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api', classifierRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
