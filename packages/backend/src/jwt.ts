// JWT format
// {
//     "iss": "https://hikyaku-protocol-notifier.vercel.app",
//     "sub": "ken@example.com",
//     "type": "email",
//     "nonce": 9999,
//     "exp": 1620000000
//   }

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET_FOR_SIGN as string

import * as jwt from 'jsonwebtoken'

function createJwt(email: string, req: string): string {
    console.log(`createJwt: Initilization`)

    // Construct Data
    const jwtPayload = {
        iss: 'https://hikyaku-protocol-notifier.vercel.app',
        sub: email,
        req: req,
        type: 'email',
        nonce: 9999, // TODO: Generate Random Nonce
        exp: 1620000000, // TODO: Set Appropriate Nonce
    }

    // Create Jwt
    const token = jwt.sign(jwtPayload, JWT_SECRET)
    console.log(`createJwt: token creation completed!`)

    return token
}

export { createJwt }
