"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shape_1 = __importDefault(require("#/shape"));
class Line extends shape_1.default {
    constructor(position, position2, length) {
        super(position);
        this.position2 = position2;
        this.length = length;
    }
    toString() {
        return `${super.toString()}, x2: ${this.position2.x}, y2: ${this.position2.y}, z2: ${this.position2.z}, length: ${this.length}`;
    }
}
exports.default = Line;
