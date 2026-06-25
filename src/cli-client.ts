import readline from 'readline'

// Setup standard input/output for terminal interaction
const terminalInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const localApiUrl = 'http://127.0.0.1:3000/api/classify'
let testingLanguage = 'en-US'

// Recursive function to keep the chat loop active
const startChatPrompt = () => {
  terminalInterface.question(`\n[User - ${testingLanguage}]: `, async (userMessage) => {
    // Check for exit commands
    const isExitCommand = userMessage.toLowerCase() === 'exit' || userMessage.toLowerCase() === 'quit'
    
    if (isExitCommand) {
      console.log('Exiting test client...')
      terminalInterface.close()
      return
    }

    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: userMessage,
          locale: testingLanguage
        })
      }

      const networkResponse = await fetch(localApiUrl, fetchOptions)
      
      const contentType = networkResponse.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const errorText = await networkResponse.text()
        console.log(`\n[Unexpected Error]: The API did not return JSON. Status: ${networkResponse.status}`)
        console.log(`Error Details:\n${errorText.substring(0, 500)}`)
        startChatPrompt()
        return
      }

      const responseData = (await networkResponse.json()) as {
        intent?: string
        response?: string
        error?: string
      }

      if (networkResponse.ok) {
        // Display formatted response mapping intent to category
        const mockConfidence = 100
        console.log(`\n[Bot] (Category: ${responseData.intent || 'Unknown'} | Confidence: ${mockConfidence}%)\n> ${responseData.response}`)
      } else {
        console.log(`\n[API Error]: ${responseData.error || 'Request failed'}`)
      }
    } catch (networkError) {
      console.log(`\n[Connection Error]: Could not connect. Is the Docker container running on port 3000?\nDetails: ${networkError instanceof Error ? networkError.message : String(networkError)}`)
    }

    // Call the prompt again to continue the conversation
    startChatPrompt()
  })
}

// Initialize the client with language selection
const initializeClient = () => {
  console.log('=============================================')
  console.log(' Test Client: Classifier API')
  console.log(' Type your message or "exit" to close')
  console.log('=============================================')

  terminalInterface.question('\nChoose language [en-US, pt-BR, es-LA] (default: en-US): ', (langInput) => {
    const trimmedInput = langInput.trim()
    if (['en-US', 'pt-BR', 'es-LA'].includes(trimmedInput)) {
      testingLanguage = trimmedInput
    } else if (trimmedInput !== '') {
      console.log(` Invalid language. Defaulting to ${testingLanguage}.`)
    }
    
    console.log(`\n--- Starting chat in ${testingLanguage} ---`)
    startChatPrompt()
  })
}

initializeClient()