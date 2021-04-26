const next = require('next');
const express = require("express");

const port = process.env.PORT || 8000
const isDevelopment = process.env.NODE_ENV !== 'production';

const app = next({ isDevelopment });
const handle = app.getRequestHandler();


app.prepare().then(() => {
    const server = express()

    server.get('/api/news', async (req, res) => {
        const response = await axios.get("http://localhost:3008/api/v1/news");
        console.log("response is", response.data);
        res.send(response.data);
    });

    server.get('/api/static', async (req, res) => {
        const response = await axios.get("http://localhost:3008/api/v1/static");
        res.send(response.data);
    });

    server.get('/api/ping', async (req, res) => {
        res.send({
            1: 1
        });
    });

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })

}).catch(err => {
    console.log('Error:::::', err)
})
