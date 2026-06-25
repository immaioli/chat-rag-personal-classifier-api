export interface ClassificationRequest {
  text: string
  locale?: string
}

export interface ClassificationResponse {
  locale: string
  intent: string
  response: string
}
