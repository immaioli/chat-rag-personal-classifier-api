import { responses } from '../data/responses'
import { ClassificationResponse } from '../types/classifier'

export class ClassifierService {
  public classifyText(text: string, providedLocale?: string): ClassificationResponse {
    const queryText = text.toLowerCase()
    
    // Determine the locale/language
    let detectedLocale: 'pt-BR' | 'en-US' | 'es-LA' = 'pt-BR'
    if (providedLocale && ['pt-BR', 'en-US', 'es-LA'].includes(providedLocale)) {
      detectedLocale = providedLocale as 'pt-BR' | 'en-US' | 'es-LA'
    } else {
      // Auto-detect based on keywords if locale is not provided
      const spanishKeywords = /currículum|experiencia|habilidad|contacto|resumen|educación|idioma/
      const englishKeywords = /resume|experience|skill|contact|summary|education|language/
      if (spanishKeywords.test(queryText)) {
        detectedLocale = 'es-LA'
      } else if (englishKeywords.test(queryText)) {
        detectedLocale = 'en-US'
      }
    }

    // Determine the intent/category
    let detectedIntent: keyof typeof responses['pt-BR'] = 'summary'

    if (queryText.match(/currículo|curriculo|currículum|\bresume\b|carta de apresentação|carta de presentación|cover letter/)) {
      detectedIntent = 'resume'
    } else if (queryText.match(/contato|contacto|contact/)) {
      detectedIntent = 'contact'
    } else if (queryText.match(/portfólio|portafolio|portfolio/)) {
      detectedIntent = 'portfolio'
    } else if (queryText.match(/habilidade|habilidad|skill/)) {
      detectedIntent = 'skills'
    } else if (queryText.match(/graduação|formação|formacao|educação|educacao|educación|education/)) {
      detectedIntent = 'education'
    } else if (queryText.match(/idioma|language/)) {
      detectedIntent = 'language'
    } else if (queryText.match(/experiência|experiencia|experience/)) {
      detectedIntent = 'experience'
    } else if (queryText.match(/resumo|resumen|summary/)) {
      detectedIntent = 'summary'
    } else {
      detectedIntent = 'other'
    }

    const availableResponses = responses[detectedLocale][detectedIntent]
    const selectedResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)]

    return {
      locale: detectedLocale,
      intent: detectedIntent,
      response: selectedResponse
    }
  }
}
