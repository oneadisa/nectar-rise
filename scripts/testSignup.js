// Simple test script for FakeStore API user registration
async function testSignup() {
  try {
    console.log('Testing FakeStore API user registration...');
    
    const userData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
      name: {
        firstname: 'Test',
        lastname: 'User'
      },
      address: {
        city: 'Test City',
        street: '123 Test St',
        number: 123,
        zipcode: '12345',
        geolocation: {
          lat: '0',
          long: '0'
        }
      },
      phone: '1234567890'
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
      console.log('User registration successful! User ID:', data.id);
    } else {
      console.log('User registration failed:', data);
    }
  } catch (error) {
    console.error('Error testing signup:', error);
  }
}

testSignup();
