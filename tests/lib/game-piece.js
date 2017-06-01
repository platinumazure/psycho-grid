/**
 * @fileoverview Unit tests for the GamePieceType class.
 * @author Kevin Partington
 */

"use strict";

const assert = require("chai").assert;
const GamePiece = require("../../lib/game-piece");
const GamePieceType = require("../../lib/game-piece-type");

const position = {
    row: 1,
    column: 2
};

const type = new GamePieceType({
    power: 1,
    speed: 2
});

describe("GamePiece", () => {
    describe("constructor", () => {
        it("should throw if type is not a GamePieceType instance", () => {
            assert.throws(
                () => new GamePiece({ position }),
                TypeError,
                /^type must be a GamePieceType$/
            );
        });

        it("should throw if position is missing", () => {
            assert.throws(
                () => new GamePiece({ type }),
                TypeError,
                /^position is required$/
            );
        });

        it("should throw if position row is non-numeric", () => {
            const pos = Object.assign({}, position, { row: "foo" });
            assert.throws(
                () => new GamePiece({ type, position: pos }),
                TypeError,
                /^position.row must be numeric$/
            );
        });

        it("should throw if position row is negative", () => {
            const pos = Object.assign({}, position, { row: -1 });
            assert.throws(
                () => new GamePiece({ type, position: pos }),
                RangeError,
                /^position.row must be nonnegative$/
            );
        });

        it("should throw if position column is non-numeric", () => {
            const pos = Object.assign({}, position, { column: "foo" });
            assert.throws(
                () => new GamePiece({ type, position: pos }),
                TypeError,
                /^position.column must be numeric$/
            );
        });

        it("should throw if position column is negative", () => {
            const pos = Object.assign({}, position, { column: -1 });
            assert.throws(
                () => new GamePiece({ type, position: pos }),
                RangeError,
                /^position.column must be nonnegative$/
            );
        });

        it("should create an instance if type and position are valid", () => {
            assert.doesNotThrow(() => new GamePiece({ type, position }));
        });
    });

    describe("setPosition", () => {
        let gamePiece;

        beforeEach(() => {
            gamePiece = new GamePiece({ type, position });
        });

        it("should throw if position is missing", () => {
            assert.throws(
                () => gamePiece.setPosition(),
                TypeError,
                /^position is required$/
            );
        });

        it("should throw if position row is non-numeric", () => {
            const pos = Object.assign({}, position, { row: "foo" });
            assert.throws(
                () => gamePiece.setPosition(pos),
                TypeError,
                /^position.row must be numeric$/
            );
        });

        it("should throw if position row is negative", () => {
            const pos = Object.assign({}, position, { row: -1 });
            assert.throws(
                () => gamePiece.setPosition(pos),
                RangeError,
                /^position.row must be nonnegative$/
            );
        });

        it("should throw if position column is non-numeric", () => {
            const pos = Object.assign({}, position, { column: "foo" });
            assert.throws(
                () => gamePiece.setPosition(pos),
                TypeError,
                /^position.column must be numeric$/
            );
        });

        it("should throw if position column is negative", () => {
            const pos = Object.assign({}, position, { column: -1 });
            assert.throws(
                () => gamePiece.setPosition(pos),
                RangeError,
                /^position.column must be nonnegative$/
            );
        });

        it("should set position if position is valid", () => {
            gamePiece.setPosition({ row: 2, column: 1 });
            assert.deepEqual(gamePiece.position, { row: 2, column: 1 });
        });
    });
});
