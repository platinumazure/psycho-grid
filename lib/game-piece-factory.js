/**
 * @fileoverview Game piece factory class.
 * @author Kevin Partington
 */

"use strict";

const GamePiece = require("./game-piece");
const gamePieceTypes = require("./data/game-piece-types.json");

const gamePieceDataByType = Object.freeze(gamePieceTypes.reduce((memo, type) => {
    memo[type.name] = type;
    return memo;
}, {}));

module.exports = {
    createPiece(name) {
        const gamePieceData = gamePieceDataByType[name];

        if (!gamePieceData) {
            throw new RangeError("Invalid piece type");
        }

        return new GamePiece(gamePieceData);
    },

    availablePieceTypes() {
        return gamePieceDataByType;
    }
};
