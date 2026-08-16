// api/proxy.js
export default async function handler(req, res) {
    // CORS-Header für den Browser setzen
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { action, login, domain, id } = req.query;
        const API_BASE = 'https://www.1secmail.com/api/v1/';

        let url = `${API_BASE}?action=${action}`;
        if (login) url += `&login=${login}`;
        if (domain) url += `&domain=${domain}`;
        if (id) url += `&id=${id}`;

        const response = await fetch(url);
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}