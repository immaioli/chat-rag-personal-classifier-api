const testCases = {
  'pt-BR': {
    summary: 'resumo',
    experience: 'experiência',
    education: 'educação',
    skills: 'habilidade',
    portfolio: 'portfólio',
    language: 'idioma',
    resume: 'currículo',
    contact: 'contato',
    other: 'qualquer coisa que não faça sentido'
  },
  'en-US': {
    summary: 'summary',
    experience: 'experience',
    education: 'education',
    skills: 'skill',
    portfolio: 'portfolio',
    language: 'language',
    resume: 'resume',
    contact: 'contact',
    other: 'random string that does not match'
  },
  'es-LA': {
    summary: 'resumen',
    experience: 'experiencia',
    education: 'educación',
    skills: 'habilidad',
    portfolio: 'portafolio',
    language: 'idioma',
    resume: 'currículum',
    contact: 'contacto',
    other: 'cualquier cosa aleatoria'
  }
}

async function runTests() {
  let passed = 0;
  let failed = 0;
  
  console.log('Starting test suite...\n');
  
  for (const locale of Object.keys(testCases)) {
    console.log(`--- Testing Locale: ${locale} ---`);
    for (const [expectedIntent, text] of Object.entries(testCases[locale])) {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/classify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, locale })
        });
        const data = await response.json();
        
        if (data.intent === expectedIntent) {
          console.log(`✅ EXPECTED: [${expectedIntent}] | RECEIVED: [${data.intent}] | TEXT: "${text}"`);
          passed++;
        } else {
          console.log(`❌ EXPECTED: [${expectedIntent}] | RECEIVED: [${data.intent}] | TEXT: "${text}"`);
          failed++;
        }
      } catch (err) {
        console.log(`❌ CONNECTION ERROR for [${expectedIntent}] "${text}":`, err.message);
        failed++;
      }
    }
    console.log('');
  }
  
  console.log(`\n=== TEST SUMMARY ===`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
}

runTests();
