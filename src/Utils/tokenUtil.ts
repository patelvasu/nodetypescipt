import jwt, { JwtPayload } from 'jsonwebtoken';

class TokenUtil{
    static generateToken(payload: object): string {
        const secret = process.env.JWT_SECRET || 'secretofdeveloper#0605@itscrescetsf';
        const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
        return jwt.sign(payload, secret, { expiresIn });
    }
    static verifyToken(token: string): JwtPayload {
        const secret = process.env.JWT_SECRET || 'secretofdeveloper#0605@itscrescetsf';
        return jwt.verify(token, secret) as JwtPayload;
    }
}

export default TokenUtil