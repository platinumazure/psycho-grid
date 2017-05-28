/**
 * @fileoverview Unit tests for the GamePiece class.
 * @author Kevin Partington
 */

"use strict";

const assert = require("chai").assert;
const GamePiece = require("../../lib/game-piece");

describe("GamePiece", () => {
    describe("constructor", () => {
        it("should throw if no properties are passed in", () => {
            assert.throws(
                () => new GamePiece(),
                TypeError,
                /^props is required and must be an object$/
            );
        });

        it("should throw if non-object properties are passed in", () => {
            [1, true, "string"].forEach(arg => {
                assert.throws(
                    () => new GamePiece(arg),
                    TypeError,
                    /^props is required and must be an object$/
                );
            });
        });

        it("should throw if power is missing", () => {
            assert.throws(
                () => new GamePiece({ speed: 1 }),
                RangeError,
                /^props.power must be numeric and nonnegative$/
            );
        });

        it("should throw if power is nonnumeric", () => {
            assert.throws(
                () => new GamePiece({ speed: 1, power: "string" }),
                RangeError,
                /^props.power must be numeric and nonnegative$/
            );
        });

        it("should throw if power is negative", () => {
            assert.throws(
                () => new GamePiece({ speed: 1, power: -1 }),
                RangeError,
                /^props.power must be numeric and nonnegative$/
            );
        });

        it("should throw if speed is missing", () => {
            assert.throws(
                () => new GamePiece({ power: 1 }),
                RangeError,
                /^props.speed must be numeric and nonnegative$/
            );
        });

        it("should throw if speed is nonnumeric", () => {
            assert.throws(
                () => new GamePiece({ power: 1, speed: "string" }),
                RangeError,
                /^props.speed must be numeric and nonnegative$/
            );
        });

        it("should throw if speed is negative", () => {
            assert.throws(
                () => new GamePiece({ power: 1, speed: -1 }),
                RangeError,
                /^props.speed must be numeric and nonnegative$/
            );
        });

        it("should assign properties to object if power/speed valid", () => {
            const gamePiece = new GamePiece({
                power: 2,
                speed: 1,
                otherProp: true
            });

            assert.strictEqual(gamePiece.power, 2);
            assert.strictEqual(gamePiece.speed, 1);
            assert.strictEqual(gamePiece.otherProp, true);
        });
    });
});
