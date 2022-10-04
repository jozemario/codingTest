import express, { Request, Response } from "express";

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import executeQuery from '../db';
import moment from 'moment';


import User from "../models/User";
const router = express.Router();

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ apiHealth: true });
});

router.get("/user", (req: Request, res: Response) => {
  res.status(200).json({ user: User.getName() });
});

router.post("/login", (req: Request, res: Response) => signIn(req,res));

//router.get("/users", (req: Request, res: Response) => findAllUsers(req,res));

export default router;



export async function createUser({ email, password }) {
	const role = 'user';
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');
    const user = {
        id: uuidv4(),
        createdAt: moment().format( 'YYYY-MM-DD HH:mm:ss'),
        email,
        hash,
        salt,
        password,
        role
    };

    try {
        const result = await executeQuery({
            query: 'INSERT INTO users (id, created_at, email, hash, salt,pass,role) VALUES(?, ?, ?, ?, ?,?,?)',
            values: [user.id, user.createdAt.toString(), user.email, user.hash, user.salt,user.password,user.role],
        });
        console.log( result );
    } catch ( error ) {
        console.log( error );
    }

    return user;
}

//createUser({email:'admin@talos.com',password:'admin'})
//createUser({email:'user@talos.com',password:'user'})


export async function findUser({ email }) {
    try {
        const result = await executeQuery({
            query: 'SELECT * FROM users WHERE email = ?',
            values: [ email ],
        });
        return result[0];
    } catch (error) {
        console.log(error);
    }
}
export async function findAllUsers(req: Request, res: Response) {
    try {
        const result = await executeQuery({
            query: 'SELECT * FROM users',
            values: [  ],
        });
        res.status(200).json(result) ;
    } catch (error) {
        console.log(error);
        res.status(200).json([]) ;
    }
}

export async function validatePassword(user, inputPassword) {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
        .toString('hex');
    const passwordsMatch = user.hash === inputHash;
    return passwordsMatch;
}

export async function signUp(args) {
            const user = await createUser(args);
            return { user };
        }

const signIn = async (req: Request, res: Response) => {
		console.log('signIn: ',req.body )
		try {
            const user = await findUser({ email: req.body.email });
            //console.log(user, await validatePassword(user, req.body.password));
            if (user && (await validatePassword(user, req.body.password))) {
                const session = {
                    id: user.id,
                    email: user.email,
                    role:user.role
                };

                res.status(200).json(session)
            }
            else{
            	res.status(200).json(null)
            }
		 } 
		catch (error) {
		        console.log('signIn: ',error);
		    }

            
        }