/**
 * @fileoverview Unit tests for the game piece factory.
 * @author Kevin Partington
 */

const assert = require("chai").assert;
const GamePiece = require("../../lib/game-piece");
const GamePieceFactory = require("../../lib/game-piece-factory");

describe("GamePieceFactory", () => {
    describe("availablePieceTypes", () => {
        it("should return an object of available piece types", () => {
            const gamePieceTypes = GamePieceFactory.availablePieceTypes();

            assert.typeOf(gamePieceTypes, "object");
            assert.isAbove(Object.keys(gamePieceTypes).length, 0);
        });
    });

    describe("createPiece", () => {
        const gamePieceTypes = GamePieceFactory.availablePieceTypes();

        Object.keys(gamePieceTypes).forEach(pieceName => {
            describe(pieceName, () => {
                it("should result in valid GamePiece", () => {
                    let gamePiece;

                    assert.doesNotThrow(
                        () => {
                            gamePiece = GamePieceFactory.createPiece(pieceName);
                        }
                    );

                    assert.instanceOf(gamePiece, GamePiece);
                });

                describe("property deserialization", () => {
                    let gamePiece;

                    before(() => {
                        gamePiece = GamePieceFactory.createPiece(pieceName);
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
