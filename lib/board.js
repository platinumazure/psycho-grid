/**
 * @fileoverview Board class. Represents the current state of all pieces in the game.
 * @author Kevin Partington
 */

"use strict";

module.exports = class Board {
    /**
     * Constructor for the Board class. Height and width are required.
     * @constructor
     */
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

    /**
     * Add a piece to the board. Throws if piece position is invalid or if a
     * piece is already present at the intended position.
     * @param {GamePiece} piece The piece to be added to the board.
     * @returns {void}
     */
    addPiece(piece) {
        if (!this.isPositionValid(piece.position)) {
            throw new RangeError(`Row ${piece.position.row}, column ${piece.position.column} is an invalid position`);
        }

        if (this.getPieceAt(piece.position)) {
            throw new RangeError(`Piece is already present at row ${piece.position.row}, column ${piece.position.column}`);
        }

        this.spaces[piece.position.row][piece.position.column] = piece;
    }

    /**
     * Retrieves the piece at a given position, or null if a piece was not
     * found.
     * @param {Position} position The position to check.
     * @returns {GamePiece|null} The game piece at the given position, or null.
     */
    getPieceAt(position) {
        if (!this.isPositionValid(position)) {
            throw new RangeError(`Row ${position.row}, column ${position.column} is an invalid position`);
        }

        return this.spaces[position.row][position.column] || null;
    }

    /**
     * Check if a position is valid on this board.
     * A position is valid if and only if the row is between 0 (inclusive) and
     * the board height (exclusive) and the column is between 0 (inclusive) and
     * the board width (exclusive).
     * @param {Position} position The position to be examined.
     * @returns {boolean} True if the position is valid, false otherwise.
     */
    isPositionValid(position) {
        return 0 <= position.row &&
            position.row < this.height &&
            0 <= position.column &&
            position.column < this.width;
    }
};
