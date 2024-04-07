import db from '#Root/firebase.js';
import { v4 as uuid } from 'uuid';

class RainController {

    /**
     * Insert a new rain log
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async newRainLog(req, res) {
        const { season, date, liters } = req.body;
        const rainRef = db.collection("Rain");
        const seasonRef = db.collection("Seasons");

        // Check if there isn't a season with this seasonCode
        const snapshot = await seasonRef.where("seasonCode", "==", season).get();
        if (snapshot.empty) return res.status(500).send({ errors: ['No existe una temporada de agrícola con ese código'] });

        // Upload new Doc
        await rainRef.doc(uuid()).set({
            "season": season,
            "date": date,
            "liters": liters
        });

        res.status(200).send("Se ha introducido un nuevo registro de lluvia");
    }

    /**
     * Delete a rain log
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async deleteRainLog(req, res) {
        const { id } = req.params;
        console.log(req.params);
        const rainRef = db.collection("Rain");

        const rainLog = await rainRef.doc(id).get();

        if (!rainLog.exists) {
            return res.status(500).send({ errors: ['No se ha encontrado un registro de lluvia con ese ID'] });
        }

        await rainRef.doc(id).delete();

        res.status(200).send("Se ha eliminado el registro de lluvia");
    }
}


export default new RainController;