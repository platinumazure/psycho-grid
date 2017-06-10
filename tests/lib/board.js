/**
 * @fileoverview Unit tests for the Board class.
 * @author Kevin Partington
 */

"use strict";

const assert = require("chai").assert;
const Board = require("../../lib/board");

describe("Board", () => {
    describe("constructor", () => {
        it("should throw if height is missing", () => {
            assert.throws(
                () => new Board({ width: 4 }),
                RangeError,
                /height is required and must be positive/
            );
        });

        it("should throw if height is negative", () => {
            assert.throws(
                () => new Board({ height: -1, width: 4 }),
                RangeError,
                /height is required and must be positive/
            );
        });

        it("should throw if height is zero", () => {
            assert.throws(
                () => new Board({ height: 0, width: 4 }),
                RangeError,
                /height is required and must be positive/
            );
        });

        it("should throw if width is missing", () => {
            assert.throws(
                () => new Board({ height: 4 }),
                RangeError,
                /width is required and must be positive/
            );
        });

        it("should throw if width is negative", () => {
            assert.throws(
                () => new Board({ height: 4, width: -1 }),
                RangeError,
                /width is required and must be positive/
            );
        });

        it("should throw if width is zero", () => {
            assert.throws(
                () => new Board({ height: 4, width: 0 }),
                RangeError,
                /width is required and must be positive/
            );
        });

        it("should not throw if height and width are valid", () => {
            assert.doesNotThrow(() => new Board({ height: 5, width: 7 }));
        });

        describe("with valid height/width and initialPieces", () => {
            it("should add each provided piece to the board", () => {
                const board = new Board({
                    height: 4,
                    width: 4,
                    initialPieces: [
                        {
                            type: {},
                            position: { row: 0, column: 0 }
                        },
                        {
                            type: {},
                            position: { row: 3, column: 3 }
                        }
                    ]
                });

                assert.ok(board.getPieceAt({ row: 0, column: 0 }));
                assert.ok(board.getPieceAt({ row: 3, column: 3 }));
            });
        });
    });

    describe("isPositionValid", () => {
        let board;

        beforeEach(() => {
            board = new Board({ height: 4, width: 4 });
        });

        it("should return true if position is within board", () => {
            assert.isTrue(board.isPositionValid({ row: 0, column: 0 }));
            assert.isTrue(board.isPositionValid({ row: 0, column: 1 }));
            assert.isTrue(board.isPositionValid({ row: 0, column: 3 }));
            assert.isTrue(board.isPositionValid({ row: 1, column: 0 }));
            assert.isTrue(board.isPositionValid({ row: 1, column: 1 }));
            assert.isTrue(board.isPositionValid({ row: 1, column: 3 }));
            assert.isTrue(board.isPositionValid({ row: 3, column: 0 }));
            assert.isTrue(board.isPositionValid({ row: 3, column: 1 }));
            assert.isTrue(board.isPositionValid({ row: 3, column: 3 }));
        });

        it("should return false if position is outside of board", () => {
            assert.isFalse(board.isPositionValid({ row: -1, column: 0 }));
            assert.isFalse(board.isPositionValid({ row: -1, column: -1 }));
            assert.isFalse(board.isPositionValid({ row: 0, column: -1 }));
            assert.isFalse(board.isPositionValid({ row: 4, column: 3 }));
            assert.isFalse(board.isPositionValid({ row: 4, column: -1 }));
            assert.isFalse(board.isPositionValid({ row: 3, column: 4 }));
        });
    });

    describe("addPiece", () => {
        let board;

        beforeEach(() => {
            board = new Board({ height: 4, width: 4 });
        });

        it("should throw RangeError if position is outside of board", () => {
            assert.throws(
                () => board.addPiece({ type: {}, position: { row: -1, column: 0 } }),
                RangeError,
                /^Row -1, column 0 is an invalid position$/
            );
        });

        it("should add a piece successfully if position is within board", () => {
            const piece = { type: {}, position: { row: 0, column: 0 } };
            board.addPiece(piece);

            assert.strictEqual(board.getPieceAt({ row: 0, column: 0 }), piece);
        });

        describe("with piece on the board", () => {
            beforeEach(() => {
                board.addPiece({ type: {}, position: { row: 0, column: 0 } });
            });

            it("should throw RangeError if piece is already present in given position", () => {
                assert.throws(
                    () => board.addPiece({ type: {}, position: { row: 0, column: 0 } }),
                    RangeError,
                    /^Piece is already present at row 0, column 0$/
                );
            });

            it("should not throw if different location is used for new piece", () => {
                const piece = { type: {}, position: { row: 0, column: 1 } };
                board.addPiece(piece);

                assert.strictEqual(board.getPieceAt({ row: 0, column: 1 }), piece);
            });
        });
    });

    describe("getPieceAt", () => {
        const pieceOne = { type: {}, position: { row: 0, column: 0 } };
        const pieceTwo = { type: {}, position: { row: 2, column: 2 } };
        let board;

        beforeEach(() => {
            board = new Board({ height: 4, width: 4 });
            board.addPiece(pieceOne);
            board.addPiece(pieceTwo);
        });

        it("should return piece if piece is present at given position", () => {
            assert.strictEqual(board.getPieceAt({ row: 0, column: 0 }), pieceOne);
            assert.strictEqual(board.getPieceAt({ row: 2, column: 2 }), pieceTwo);
        });

        it("should reutrn null if no piece is present", () => {
            assert.strictEqual(board.getPieceAt({ row: 1, column: 1 }), null);
        });

        it("should throw RangeError if position is invalid", () => {
            assert.throws(
                () => board.getPieceAt({ row: -1, column: 0 }),
                RangeError,
                /^Row -1, column 0 is an invalid position$/
            );
        });
    });
});
