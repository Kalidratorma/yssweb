import {Player} from "./player";

export interface Unit {
    id: number;

    /**
     * Номер состава
     */
    unitNumber: number;

    /**
     * Список игроков в звене
     */
    playerList: Player[];
}
