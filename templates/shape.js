"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    constructor(position) {
        this.position = position;
    }
    toString() {
        return `x: ${this.position.x}, y: ${this.position.y}, z: ${this.position.z}`;
    }
}
exports.default = Shape;
