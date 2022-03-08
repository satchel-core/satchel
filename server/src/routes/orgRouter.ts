import express, { NextFunction, Request, Response } from 'express';
import Org from '../models/Org';
import * as dotenv from 'dotenv';
import School from '../models/School';
import * as ethUtil from 'ethereumjs-util';
import * as sigUtil from 'eth-sig-util';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    let org = {};
    try {
        org = await Org.findOne({ address });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, org });
});

router.get('/allOrgs', async (req, res) => {
    let orgs = [];
    try {
        orgs = await Org.findOne();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, orgs });
});

router.get('/getSchools', async (req, res) => {
    const { orgAddress } = req.query;
    let schools = [];
    try {
        schools = await School.find({ orgAddress });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, schools });
});

router.post('/createOrg', async (req, res) => {
    const { name, address, schools } = req.body;

    console.log(name, address, schools);

    // if (!name) {
    //     return res.status(400).json({
    //         email: 'Name not found',
    //     });
    // } else if (!schools) {
    //     return res.status(400).json({
    //         email: 'Schools not found',
    //     });
    // } else if (!address) {
    //     return res.status(400).json({
    //         address: 'Address not found',
    //     });
    // }

    try {
        let newOrg = new Org({ name, schools, address });
        await newOrg.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true });
});

export const create = (req: Request, res: Response, next: NextFunction) => {
    const { signature, publicAddress } = req.body;
    if (!signature || !publicAddress)
        return res.status(400).send({ error: 'Request should have signature and publicAddress' });

    return (
        Org.findOne({ where: { publicAddress } })
            ////////////////////////////////////////////////////
            // Step 1: Get the user with the given publicAddress
            ////////////////////////////////////////////////////
            .then((user) => {
                if (!user)
                    return res.status(401).send({
                        error: `User with publicAddress ${publicAddress} is not found in database`,
                    });
                return user;
            })
            ////////////////////////////////////////////////////
            // Step 2: Verify digital signature
            ////////////////////////////////////////////////////
            .then((user) => {
                if (!(user instanceof Org)) {
                    // Should not happen, we should have already sent the response
                    throw new Error('User is not defined in "Verify digital signature".');
                }

                const msg = `I am signing my one-time nonce: ${user.nonce}`;

                // We now are in possession of msg, publicAddress and signature. We
                // will use a helper from eth-sig-util to extract the address from the signature
                const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
                const address = sigUtil.recoverPersonalSignature({
                    data: msgBufferHex,
                    sig: signature,
                });

                // The signature verification is successful if the address found with
                // sigUtil.recoverPersonalSignature matches the initial publicAddress
                if (address.toLowerCase() === publicAddress.toLowerCase()) {
                    return user;
                } else {
                    return res.status(401).send({ error: 'Signature verification failed' });
                }
            })
            ////////////////////////////////////////////////////
            // Step 3: Generate a new nonce for the user
            ////////////////////////////////////////////////////
            .then((user) => {
                if (!(user instanceof Org)) {
                    // Should not happen, we should have already sent the response

                    throw new Error('User is not defined in "Generate a new nonce for the user".');
                }

                user.nonce = Math.floor(Math.random() * 10000);
                return user.save();
            })
            ////////////////////////////////////////////////////
            // Step 4: Create JWT
            ////////////////////////////////////////////////////
            .then((user) => {
                return new Promise<string>((resolve, reject) =>
                    // https://github.com/auth0/node-jsonwebtoken
                    jwt.sign(
                        {
                            payload: {
                                id: user.id,
                                publicAddress,
                            },
                        },
                        config.secret,
                        {},
                        (err, token) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(token || ''); // TODO: fix this
                        }
                    )
                );
            })
            .then((accessToken) => res.json({ accessToken }))
            .catch(next)
    );
};

module.exports = router;
export default router;
