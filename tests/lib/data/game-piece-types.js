/**
 * @fileoverview Functional tests for the game piece types data file.
 * @author Kevin Partington
 */

const assert = require("chai").assert;
const GamePiece = require("../../../lib/game-piece");
const gamePieceTypes = require("../../../lib/data/game-piece-types.json");

gamePieceTypes.forEach(typeDescriptor => {
    describe(typeDescriptor.name, () => {
        it("should result in valid GamePiece", () => {
            assert.doesNotThrow(
                () => new GamePiece(typeDescriptor)
            );
        });

        describe("property deserialization", () => {
            let gamePiece;

            before(() => {
                gamePiece = new GamePiece(typeDescriptor);
            });

            ["name", "displayName", "textIcon", "power", "speed"].forEach(propName => {
                it(`should deserialize the ${propName} property`, () => {
                    assert.property(gamePiece, propName);
                });
            });
        });
    });
});
