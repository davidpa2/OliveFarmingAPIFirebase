import db from '#Root/firebase.js';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid'

class SeasonsController {

    async addSeason(req, res) {
        const { seasonCode } = req.body;
        const seasonRef = collection(db, "Seasons");

        // Check if there is a season with this seasonCode
        const q = query(seasonRef, where("seasonCode", "==", seasonCode));
        var season = null;
        // Get the results
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            season = doc;
        });
        if (season) return res.status(409).send({ errors: ['Ya existe una temporada de lluvia con ese código'] });

        // Upload new Doc
        await setDoc(doc(db, "Seasons", uuid()), {
            "seasonCode": seasonCode
        });

        res.status(200).send("Se ha introducido una nueva temporara agrícola");
    }
}


export default new SeasonsController;