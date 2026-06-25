# chat-rag-personal-classifier-api

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.3.3-blue.svg)
![Docker](https://img.shields.io/badge/docker-supported-2496ED.svg)

A high-performance, lightweight Node.js and TypeScript API designed to classify natural language text into predefined categories. Optimized for messaging platforms (Chatbots, WhatsApp), it utilizes a custom weighted keyword-matching algorithm to provide ultra-low latency responses without relying on heavy external LLMs.

---

## 🚀 Features

* **Multi-Language Support**: Fully supports `pt-BR`, `en-US`, and `es-LA`.
* **Smart Classification**: Uses weighted keyword co-occurrence to categorize text into 9 distinct domains (summary, experience, skills, etc.).
* **Dynamic Responses**: Randomly selects varied responses within the matched category to simulate natural conversation.
* **Low Latency**: Built for speed, making it ideal for synchronous chatbot webhooks.
* **Docker Ready**: Fully containerized for easy deployment and scaling.
* **Built-in CLI Client**: Includes a terminal-based chat client for rapid local testing.

---

## 🛠 Architecture & Tech Stack

* **Runtime**: Node.js
* **Language**: TypeScript
* **Framework**: Express.js
* **Containerization**: Docker & Docker Compose
* **Architecture Pattern**: Controller-Service-Router layers

---

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/en/) (v20 or higher)
* [Docker](https://www.docker.com/) and Docker Compose

### Installation

Clone the repository and install the dependencies:

```bash
git clone <your-repository-url>
cd chat-rag-personal-classifier-api
npm install
```

### Running with Docker (Recommended)

To start the application in an isolated containerized environment:

```bash
docker-compose up -d --build
```

The API will be available at `http://localhost:3000`.

### Running Locally (Development Mode)

To run the API directly on your machine with hot-reloading:

```bash
npm run dev
```

---

## 📖 API Reference

**Production URL:** `https://api.maioli.dev.br/chat-rag-personal-classifier-api`

### Classify Text

Classifies an incoming message and returns a contextual response.

**Endpoint:** `POST /chat-rag-personal-classifier-api/classify`

**Headers:**

* `Content-Type: application/json`

**Request Body:**

```json
{
  "text": "skill",
  "locale": "en-US"
}
```

**Success Response (200 OK):**

```json
{
  "locale": "pt-BR",
  "intent": "skills",
  "response": "Minhas principais ferramentas incluem Node.js, TypeScript e bancos de dados relacionais."
}
```

**Error Response (400 Bad Request):**

```json
{
  "error": "Bad Request",
  "message": "The provided locale is not supported. Use pt-BR, en-US, or es-LA."
}
```

---

## 💻 Testing the API

We provide two ways to test the application natively.

### 1. Interactive CLI Client

You can run an interactive chat interface directly in your terminal to simulate a user chatting with the bot. O código interno utiliza chamadas nativas do Node.js.

```bash
npm run client
```

**Code Snapshot (`src/cli-client.ts` integration example):**

```typescript
// Fetch data from the local API
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
const responseData = await networkResponse.json()
```

### 2. HTTP REST Client

If your IDE supports `.http` files (like VS Code REST Client), open the `api-tests.http` file at the root of the project and click `Send Request` to fire predefined payloads.

---

## 📂 Project Structure

```text
chat-rag-personal-classifier-api/
├── src/
│   ├── index.ts                     # Application entry point
│   ├── cli-client.ts                # Interactive terminal chat client
│   ├── types/
│   │   └── index.ts                 # Global TypeScript interfaces and types
│   ├── data/
│   │   └── responses.ts             # Database of categorized bot responses
│   ├── services/
│   │   └── classifierService.ts     # Core algorithm for text analysis
│   ├── controllers/
│   │   └── classifierController.ts  # Request validation and HTTP response handling
│   └── routes/
│       └── classifierRoutes.ts      # Express route definitions
├── Dockerfile                       # Docker image blueprint
├── docker-compose.yml               # Docker services orchestration
├── api-tests.http                   # REST Client testing suite
├── test-all.js                      # Automated script for testing all intents and locales
├── package.json
└── tsconfig.json
```

---

## 📝 Code Standards

This project follows strict coding guidelines:

* Single quotes (`'`) for all strings in JavaScript/TypeScript.
* No semicolons (`;`) at the end of statements.
* Highly descriptive variable names (no single-letter variables).
* Code comments must be exclusively in `en-US`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
