import '#Config/env.js';
import expressApp from "#Config/express.js";
import swaggerDocs from './swagger.js';

var app = expressApp;
var port = process.env.PUERTO || 3525;

app.get('/ping', function (req, res) {
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

app.listen(port, function () {
    console.log(`Server running in http://localhost:${port}`);
    swaggerDocs(app, port)
});