import {Unit} from "./unit";
import {Team} from "./team";

export interface Composition {

    id: number;

    /**
     * Номер состава
     */
    compositionNumber: number;

    /**
     * Звенья
     */
    units: Unit[];

    /**
     * Команда
     */
    team: Team;
}
