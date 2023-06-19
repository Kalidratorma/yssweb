import {Role} from "./role";

export interface AuthenticationResponse {
    token: String;
    role: Role;
    exp: Date;
}
