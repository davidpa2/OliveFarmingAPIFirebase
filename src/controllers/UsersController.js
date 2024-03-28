import db from '#Root/firebase.js';
import { collection, query, where, getDocs, getDoc } from 'firebase/firestore'
import { compare } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { SignJWT } from 'jose';

class UsersController {
    collection = "Users";

    async loginUser(req, res) {
        const usersRef = collection(db, "Users");
        const { email, password } = req.body

        // Execute the query
        const q = query(usersRef, where("email", "==", email));
        var exisingUserByEmail = null;
        // Get the results
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            exisingUserByEmail = doc;
        });

        // Check if the user exists by email
        if (!exisingUserByEmail) return res.status(401).send({ errors: ["Credenciales incorrectas"] });

        // Check if the password is correct
        const checkPassword = await compare(password, exisingUserByEmail.data().password)
        if (!checkPassword) return res.status(401).send({ errors: ["Credenciales incorrectas"] });

        // Generate JWT
        const jwtConstructor = new SignJWT({ id: exisingUserByEmail._id });

        const encoder = new TextEncoder();
        const jwt = await jwtConstructor.setProtectedHeader({
            alg: 'HS256', typ: 'JWT'
        }).setIssuedAt().setExpirationTime('7d').sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        return res.send({ jwt });
    }
}

export default new UsersController;