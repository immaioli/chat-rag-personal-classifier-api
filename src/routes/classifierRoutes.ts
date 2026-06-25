import { Router } from 'express'
import { ClassifierController } from '../controllers/classifierController'

const router = Router()
const classifierController = new ClassifierController()

router.post('/classify', classifierController.classify)

export default router
