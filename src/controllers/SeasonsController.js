import db from '#Root/firebase.js';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid'

class SeasonsController {

    async addSeason(req, res) {
        const { seasonCode } = req.body;
        const seasonRef = collection(db, "Seasons");

        // Check if the seasonCode format is correct
        let regex = /^[0-9]{2}\/[0-9]{2}$/gm;
        if (!regex.test(seasonCode)) {
            res.status(409).send({ errors: ['El código de la temporada no tiene el formato correcto. Por favor, usa un formato como: 21/22'] });
        }

        // Check if there is a season with this seasonCode
        const q = query(seasonRef, where("seasonCode", "==", seasonCode));
        let season = null;
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