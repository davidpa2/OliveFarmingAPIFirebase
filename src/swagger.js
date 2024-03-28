import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "OliveFarmingAPIFirebase", version: "1.0.0" }
    },
    apis: ["./src/routes/users.routes.js", "./src/routes/seasons.routes.js"],
};


const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    });

    console.log(`Version 1 Docs are available at http://localhost:${port}/api/docs`)
}

export default swaggerDocs;