export interface GameFormat {

    id: number;

    /**
     * Название формата
     */
    name: String;

    /**
     * Тип льда
     */
    iceType: IceType;

    /**
     * Количество игроков в команде
     */
    numberOfPlayers: number;
}
