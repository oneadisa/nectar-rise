// Simple test script for FakeStore API authentication
const { API_BASE_URL, API_ENDPOINTS, getApiUrl } = require('../config/env');

async function testLogin() {
  try {
    console.log("Testing FakeStore API login...");

    const response = await fetch(getApiUrl(API_ENDPOINTS.LOGIN), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "mor_2314", // Test credentials from FakeStore API
        password: "83r5^_",
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (response.ok) {
      console.log("Login successful! Token:", data.token);
    } else {
      console.log("Login failed:", data);
    }
  } catch (error) {
    console.error("Error testing login:", error);
  }
}

testLogin();
