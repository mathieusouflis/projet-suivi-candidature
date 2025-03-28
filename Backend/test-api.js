// test-api.js
const http = require('http');
const https = require('https');

let authToken = '';

const makeRequest = (options, data = null) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonResponse = JSON.parse(responseData);
          console.log(`✅ ${options.method} ${options.path} - Status: ${res.statusCode}`);
          resolve(jsonResponse);
        } catch (error) {
          console.error(`❌ Erreur lors du parsing de la réponse: ${error.message}`);
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error(`❌ Erreur de requête: ${error.message}`);
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
};

const runTests = async () => {
  try {
    console.log('🔍 Début des tests API...');
    
    // Test 1: Inscription d'un utilisateur
    console.log('\n📝 Test d\'inscription utilisateur...');
    const registerResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/v1/auth/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, {
      username: `testuser_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: 'TestPassword123',
      pays: 'France',
      statusPro: 'Étudiant'
    });
    
    if (registerResponse.token) {
      authToken = registerResponse.token;
      console.log('✅ Inscription réussie, token obtenu');
    } else {
      throw new Error('Pas de token dans la réponse d\'inscription');
    }
    
    // Test 2: Connexion utilisateur
    console.log('\n🔑 Test de connexion utilisateur...');
    const loginResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/v1/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, {
      email: registerResponse.user.email,
      password: 'TestPassword123'
    });
    
    // Test 3: Création d'une candidature
    console.log('\n📄 Test de création de candidature...');
    const applicationResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/v1/applications',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }, {
      title: 'Développeur Full Stack Test',
      company: 'Test Corp',
      type: 'Stage',
      link: 'https://example.com/job-test',
      status: 'En attente',
      location: 'Paris',
      salary: '1200€/mois',
      description: 'Test de création de candidature'
    });
    
    // Test 4: Récupération des candidatures
    console.log('\n📋 Test de récupération des candidatures...');
    const getApplicationsResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/v1/applications',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    // Test 5: Vérification des statistiques
    console.log('\n📊 Test de récupération des statistiques...');
    const statsResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/v1/stats',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    console.log('\n✅ Tous les tests ont réussi !');
    
  } catch (error) {
    console.error(`\n❌ Échec des tests: ${error.message}`);
  }
};

runTests();