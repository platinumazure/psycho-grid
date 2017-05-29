/**
 * @fileoverview Unit tests for the game piece type factory.
 * @author Kevin Partington
 */

"use strict";

const assert = require("chai").assert;
const GamePieceType = require("../../lib/game-piece-type");
const GamePieceTypeFactory = require("../../lib/game-piece-type-factory");

describe("GamePieceTypeFactory", () => {
    describe("availablePieceTypes", () => {
        it("should return an object of available piece types", () => {
            const gamePieceTypes = GamePieceTypeFactory.availablePieceTypes();

            assert.typeOf(gamePieceTypes, "object");
            assert.isAbove(Object.keys(gamePieceTypes).length, 0);
        });
    });

    describe("createPiece", () => {
        const gamePieceTypes = GamePieceTypeFactory.availablePieceTypes();

        Object.keys(gamePieceTypes).forEach(pieceName => {
            describe(pieceName, () => {
                it("should result in valid GamePieceType", () => {
                    let gamePiece;

                    assert.doesNotThrow(
                        () => {
                            gamePiece = GamePieceTypeFactory.createPiece(pieceName);
                        }
                    );

                    assert.instanceOf(gamePiece, GamePieceType);
                });

                describe("property deserialization", () => {
                    let gamePiece;

                    before(() => {
                        gamePiece = GamePieceTypeFactory.createPiece(pieceName);
                    });

                    ["name", "displayName", "textIcon", "power", "speed"].forEach(propName => {
                        it(`should deserialize the ${propName} property`, () => {
                            assert.property(gamePiece, propName);
                        });
                    });
                });
            });
        });
    });
});
