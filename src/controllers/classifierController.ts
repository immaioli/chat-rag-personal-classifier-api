import { Request, Response } from 'express'
import { ClassifierService } from '../services/classifierService'

export class ClassifierController {
  private classifierService = new ClassifierService()

  public classify = (request: Request, response: Response) => {
    try {
      const { text, locale } = request.body

      if (!text || typeof text !== 'string') {
        return response.status(400).json({ error: 'Text field is required and must be a string' })
      }

      const result = this.classifierService.classifyText(text, locale)
      return response.status(200).json(result)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Classification Error:', error)
      return response.status(500).json({ error: 'Internal Server Error', details: errorMessage })
    }
  }
}
