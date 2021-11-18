"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shape_1 = __importDefault(require("#/shape"));
class Cube extends shape_1.default {
    constructor(position, width, height, depth) {
        super(position);
        this.secondPosition = {
            x: position.x + width,
            y: position.y + height,
            z: position.z + depth,
        };
    }
    toString() {
        return `${super.toString()}, x2: ${this.secondPosition.x}, y2: ${this.secondPosition.y}, z2: ${this.secondPosition.z}`;
    }
}
exports.default = Cube;
