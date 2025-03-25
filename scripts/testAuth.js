// Simple test script for FakeStore API authentication
async function testLogin() {
  try {
    console.log('Testing FakeStore API login...');
    
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'mor_2314',  // Test credentials from FakeStore API
        password: '83r5^_'
      }),
    });
    
    const data = await response.json();
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('Login successful! Token:', data.token);
    } else {
      console.log('Login failed:', data);
    }
  } catch (error) {
    console.error('Error testing login:', error);
  }
}

testLogin();
