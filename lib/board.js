/**
 * @fileoverview Board class. Represents the current state of all pieces in the game.
 * @author Kevin Partington
 */

"use strict";

module.exports = class Board {
    constructor({ height, width, initialPieces }) {
        if (!height || height <= 0) {
            throw new RangeError("height is required and must be positive");
        }

        if (!width || width <= 0) {
            throw new RangeError("width is required and must be positive");
        }

        this.height = height;
        this.width = width;

        this.spaces = [];
        for (let i = 0; i < height; ++i) {
            this.spaces.push([]);
        }

        if (initialPieces && initialPieces.length) {
            initialPieces.forEach(this.addPiece, this);
        }
    }

    addPiece(/* piece */) {
        // TODO: Implement this
    }
};
