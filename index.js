require('dotenv').config();
const axios = require('axios');
const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

async function fetchDataAndSendToGoogleSheets() {
    try {
        const response = await axios.get(apiUrl);

        const users = response.data.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            website: user.website,
            company: user.company.name
        }))

        const result = await axios.post(googleAppsScriptUrl, users, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Google Apps Script response:', result.data);
    } catch(error) {
        console.error('Error:', error.message)
    }
}

fetchDataAndSendToGoogleSheets();