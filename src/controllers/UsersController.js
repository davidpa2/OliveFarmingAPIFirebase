import db from '#Root/firebase.js';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore'
import { compare, hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { SignJWT } from 'jose';
import { SALT } from '#Constants/salt.js';

class UsersController {

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


    async register(req, res) {
        const { name, surname, email, password } = req.body;
        const usersRef = collection(db, "Users");

        // Check if there is an user with this email
        const q = query(usersRef, where("email", "==", email));
        var existingUserByEmail = null;
        // Get the results
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            existingUserByEmail = doc;
        });
        if (existingUserByEmail) return res.status(409).send({ errors: ['Ya existe un usuario con ese email registrado'] });

        // Hash password
        const hashedPassword = await hash(password, SALT);
        // And upload Doc
        await setDoc(doc(db, "Users", uuid()), {
            "email": email,
            "password": hashedPassword,
            "name": name,
            "surname": surname
        });

        res.status(200).send("Se ha registrado el usuario")
    }
}

export default new UsersController;