const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<html>
                        <head><title>Enter Message</title></head>
                        <body>
                            <form action="/message" method ="POST">
                                <input type="text" name="message">
                                <button type="submit">Send</button>
                            </form>
                        </body>

                        <head><title>Enter Username</title></head>
                        <body>
                            <form action="/create-user" method ="POST">
                                <input type="text" name="create-user">
                                <button type="submit">Send</button>
                            </form>
                        </body>
                    </html>`);
        return res.end();
    }
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const bodyString = Buffer.concat(body).toString();
            const message = bodyString.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.writeHead(302, {'Location': '/'});
                return res.end();
            });
            console.log(bodyString);
        });
        
    }
    if(url === '/users') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<html>
                        <head><title>List of users</title></head>
                        <ul><li>User 1</li></ul>
                    </html>`);
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const bodyString = Buffer.concat(body).toString();
            console.log(bodyString); 
        });
        res.writeHead(302, {'Location': '/'});
            return res.end();
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello World</h1>');
};

module.exports =  {
    handler: requestHandler
};