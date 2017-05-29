/**
 * @fileoverview Game piece type factory class.
 * @author Kevin Partington
 */

"use strict";

const GamePieceType = require("./game-piece-type");
const gamePieceTypes = require("./data/game-piece-types.json");

const gamePieceTypeDateByName = Object.freeze(gamePieceTypes.reduce((memo, type) => {
    memo[type.name] = type;
    return memo;
}, {}));

module.exports = {
    createPiece(name) {
        const gamePieceData = gamePieceTypeDateByName[name];

        if (!gamePieceData) {
            throw new RangeError("Invalid piece type");
        }

        return new GamePieceType(gamePieceData);
    },

    availablePieceTypes() {
        return gamePieceTypeDateByName;
    }
};
