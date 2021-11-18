"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shape_1 = __importDefault(require("#/shape"));
class Ball extends shape_1.default {
    constructor(position, radius) {
        super(position);
        this.radius = radius;
    }
    toString() {
        return `${super.toString()}, radius: ${this.radius}`;
    }
}
exports.default = Ball;
