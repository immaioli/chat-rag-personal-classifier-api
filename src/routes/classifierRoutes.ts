import { Router } from 'express'
import { ClassifierController } from '../controllers/classifierController'

const router = Router()
const classifierController = new ClassifierController()

router.post('/', classifierController.classify)

export default router
