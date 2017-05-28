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
    });
});
