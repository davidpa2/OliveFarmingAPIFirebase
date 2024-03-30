import db from '#Root/firebase.js';
import { v4 as uuid } from 'uuid'

class SeasonsController {

    /**
     * Add a new season
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async addSeason(req, res) {
        const { seasonCode } = req.body;
        const seasonRef = db.collection("Seasons");

        // Check if the seasonCode format is correct
        let regex = /^[0-9]{2}\/[0-9]{2}$/gm;
        if (!regex.test(seasonCode)) {
            res.status(409).send({ errors: ['El código de la temporada no tiene el formato correcto. Por favor, usa un formato como: 21/22'] });
        }

        // Check if there is a season with this seasonCode
        const snapshot = await seasonRef.where("seasonCode", "==", seasonCode).get();
        if (!snapshot.empty) return res.status(409).send({ errors: ['Ya existe una temporada de lluvia con ese código'] });

        // Upload new Doc
        await seasonRef.doc(uuid()).set({
            "seasonCode": seasonCode
        });

        res.status(200).send("Se ha introducido una nueva temporada agrícola");
    }

    /**
     * Get the count of all seasons
     * @param {*} req 
     * @param {*} res 
     */
    async seasonsCount(req, res) {
        const snapshot = await db.collection("Seasons").get();
        res.status(200).send({ seasonCount: snapshot.docs.length });
    }

    /**
     * Get all seasons
     * @param {*} req 
     * @param {*} res 
     */
    async getAllSeasons(req, res) {
        const seasonsRef = db.collection('Seasons');
        const snapshot = await seasonsRef.get();

        var seasons = [];
        snapshot.forEach(doc => {
            seasons.push(doc.data().seasonCode);
        });

        res.status(200).send({seasons})
    }
}


export default new SeasonsController;