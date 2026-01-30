
const API_URL = 'http://localhost:3000/api/auth';

async function testAuth() {
    const timestamp = Date.now();
    const user = {
        name: 'TestUser' + timestamp, // Using 'name' as key for registration payload? Wait, frontend sends username as name?
        // Frontend store: name: data.username
        // AuthController expects: name, email, password...
        // So I should send name.
        name: 'Test User ' + timestamp,
        email: `test${timestamp}@example.com`,
        password: 'password123',
        avatar: 'http://avatar.url',
        location: 'Test City'
    };

    console.log('Registering user:', user.email);
    const regRes = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });

    const regData = await regRes.json();
    console.log('Register response:', regRes.status, regData);

    if (regRes.status !== 201) return;

    console.log('Logging in...');
    const loginRes = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: user.email, password: user.password})
    });

    const loginData = await loginRes.json();
    console.log('Login response status:', loginRes.status);
    console.log('Login response body:', JSON.stringify(loginData, null, 2));
}

testAuth().catch(console.error);
