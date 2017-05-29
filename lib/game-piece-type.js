/**
 * @fileoverview Game piece type class.
 * @author Kevin Partington
 */

"use strict";

module.exports = class GamePieceType {
    /**
     * Constructor for the GamePieceType class.
     * @param {Object} props The initialization properties for the GamePieceType.
     * @param {number} props.power The piece's power. Must be nonnegative.
     * @param {number} props.speed The piece's speed. Must be nonnegative.
     * @constructor
     */
    constructor(props) {
        if (!props || typeof props !== "object") {
            throw new TypeError("props is required and must be an object");
        }

        if (typeof props.power !== "number" || props.power < 0) {
            throw new RangeError("props.power must be numeric and nonnegative");
        }

        if (typeof props.speed !== "number" || props.speed < 0) {
            throw new RangeError("props.speed must be numeric and nonnegative");
        }

        Object.assign(this, props);
    }
};
