/* eslint-disable @typescript-eslint/consistent-type-definitions */
// Express>namespace>request interface>attacth
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null;
    }
  }
}
