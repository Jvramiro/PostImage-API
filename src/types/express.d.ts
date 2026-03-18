import { UserRole } from "../enums/UserRole";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                role: UserRole;
            }
        }
    }
}