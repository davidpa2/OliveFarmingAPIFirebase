import { db } from '#Root/firebase.js';
import {v4 as uuid} from 'uuid'

class SeasonsController {

    async addSeason(req, res) {
        console.log(req.body);
        const { seasonCode, seasonLiters } = req.body;
        const seasonRef = db.collection("Seasons").doc(uuid());
        const res2 = await seasonRef.set({
            "seasonCode": seasonCode,
            "seasonLiters": seasonLiters
        })

        res.status(200).send("Correcto")
    }
}


export default SeasonsController;