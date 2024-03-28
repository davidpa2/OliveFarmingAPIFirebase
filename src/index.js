import { db } from './firebase.js';
import '#Config/env.js';
import expressApp from "#Config/express.js";
import {v4 as uuid} from 'uuid'

var app = expressApp;
var port = process.env.PORT || 3525;


app.get('/', function (req, res) {
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

app.post("/addSeason", async (req, res) => {
    console.log(req.body);
    const { seasonCode, seasonLiters } = req.body;
    const seasonRef = db.collection("Seasons").doc(uuid());
    const res2 = await seasonRef.set({
        "seasonCode": seasonCode,
        "seasonLiters": seasonLiters
    })

    res.status(200).send("Correcto")
})

app.listen(port, function () {
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log(`	[GET] http://localhost:${port}/`);
});