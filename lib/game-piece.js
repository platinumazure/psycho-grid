/**
 * @fileoverview Game piece class. Contains game piece type info and a position.
 * @author Kevin Partington
 */

"use strict";

const GamePieceType = require("./game-piece-type");

/**
 * Validate a position object.
 * @param {Object} position The position to be validated.
 * @param {number} position.row The nonnegative row component of the position.
 * @param {number} position.column The nonnegative column component of the position.
 * @returns {void}
 */
function validatePosition(position) {
    if (!position) {
        throw new TypeError("position is required");
    }

    if (typeof position.row !== "number") {
        throw new TypeError("position.row must be numeric");
    }

    if (typeof position.column !== "number") {
        throw new TypeError("position.column must be numeric");
    }

    if (typeof position.row !== "number" || position.row < 0) {
        throw new RangeError("position.row must be nonnegative");
    }

    if (typeof position.column !== "number" || position.column < 0) {
        throw new RangeError("position.column must be nonnegative");
    }
}

module.exports = class GamePiece {
    /**
     * Constructs a new GamePiece instance. GamePieceType and position are
     * required.
     * @constructor
     * @param {GamePieceType} type The game piece type information.
     * @param {Object} position The position this game piece occupies.
     */
    constructor({ type, position }) {
        if (!(type instanceof GamePieceType)) {
            throw new TypeError("type must be a GamePieceType");
        }

        validatePosition(position);

        this.type = type;
        this.position = Object.freeze(Object.assign({}, position));
    }

    /**
     * Sets the position for this GamePiece.
     * @param {Object} position The new position this game piece should occupy.
     * @returns {void}
     */
    setPosition(position) {
        validatePosition(position);
        this.position = Object.freeze(Object.assign({}, position));
    }
};
