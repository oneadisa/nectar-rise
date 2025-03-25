// Simple test script for FakeStore API user registration with minimal fields
async function testMinimalSignup() {
  try {
    console.log('Testing FakeStore API user registration with minimal fields...');
    
    // Minimal user data
    const userData = {
      email: 'minimal@example.com',
      username: 'minimaluser',
      password: 'password123'
    };
    
    const response = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('User registration successful with minimal fields! User ID:', data.id);
    } else {
      console.log('User registration failed:', data);
    }
  } catch (error) {
    console.error('Error testing signup:', error);
  }
}

testMinimalSignup();
