import db from '#Root/firebase.js';
import { compare, hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { SignJWT } from 'jose';
import { SALT } from '#Constants/salt.js';

class UsersController {

    /**
     * Login to account
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async loginUser(req, res) {
        const usersRef = db.collection("Users");
        const { email, password } = req.body

        // Check if there is an user with this email
        const snapshot = await usersRef.where("email", "==", email).get();
        if (snapshot.empty) return res.status(401).send({ errors: ['Credenciales incorrectas'] });

        var exisingUserByEmail = null;
        snapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            exisingUserByEmail = doc;
        });

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

    /**
     * Register an user
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async register(req, res) {
        const { name, surname, email, password } = req.body;
        const usersRef = db.collection("Users");

        // Check if there is an user with this email
        const snapshot = await usersRef.where("email", "==", email).get();
        if (!snapshot.empty) return res.status(401).send({ errors: ['Ya existe un usuario con ese email registrado'] });

        // Hash password
        const hashedPassword = await hash(password, SALT);
        // And upload Doc
        await usersRef.doc(uuid()).set({
            "email": email,
            "password": hashedPassword,
            "name": name,
            "surname": surname
        });

        res.status(200).send("Se ha registrado el usuario")
    }
}

export default new UsersController;