import { replaceTscAliasPaths } from "tsc-alias";
import fs, { promises as fsp } from "fs";
import mylas from "mylas";

export interface TestResults {
    rounds: number[];
    average: number;
    max: number;
    min: number;
}

export class Benchmark {

    constructor(readonly maxFiles: number, readonly maxPaths: number, readonly rounds: number, readonly silent = false) { }

    private async setup() {
        mylas.dir.mkS("./testing");

        const paths = {};
        for (let i = 0; i < this.maxPaths; i++) {
            Reflect.set(paths, `#${i}/*`, ["./*"]);
        }
        const tsconfig = {
            compilerOptions: {
                baseUrl: "./",
                outDir: "./testing",
                paths
            }
        };
        await mylas.json.save("./tsconfig.testing.json", tsconfig);
    }

    private async teardown() {
        await fsp.rm("./testing", {
            recursive: true,
        });
    }

    private async copyIndexes() {
        const promises = [];
        for (let i = 0; i < this.maxFiles; i++) {
            const j = i % this.maxPaths;
            promises.push(mylas.save(`./testing/index${i}.js`, `
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ball_1 = __importDefault(require("#${j}/ball"));
const cube_1 = __importDefault(require("#${j}/cube"));
const line_1 = __importDefault(require("#${j}/line"));
const ball = new ball_1.default({ x: 0, y: 0, z: 0 }, 5);
const cube = new cube_1.default({ x: 0, y: 0, z: 0 }, 5, 5, 5);
const line = new line_1.default({ x: 0, y: 0, z: 0 }, { x: 5, y: 5, z: 5 }, 20);
console.log(ball.toString());
console.log(cube.toString());
console.log(line.toString());
`));
        }
        await Promise.all(promises);
    }

    private async copyTemplates() {
        await Promise.all(
            fs.readdirSync("./templates/", "utf-8")
                .map((e: string) => fsp.copyFile(`./templates/${e}`, `./testing/${e}`)));
    }

    private async run() {
        const start = Date.now();

        await replaceTscAliasPaths({
            configFile: "tsconfig.testing.json",
            silent: true
        });

        return (Date.now() - start);
    }

    public async runTest(): Promise<TestResults> {
        await this.setup();
        const results: number[] = [];
        for (let i = 0; i < this.rounds; i++) {
            await Promise.all([
                this.copyIndexes(),
                this.copyTemplates(),
            ]);
            const result = await this.run();
            if (!this.silent) console.log(`Result round ${i + 1}: ${result}ms`);
            results.push(result);
        }
        await this.teardown();

        return {
            rounds: results,
            ...results.reduce((prev: { max: number, min: number, average: number; }, curr, _, { length }) => {
                return {
                    max: prev.max > curr ? prev.max : curr,
                    min: prev.min < curr ? prev.min : curr,
                    average: prev.average + curr / length
                };
            }, {
                max: 0,
                min: Number.POSITIVE_INFINITY,
                average: 0,
            }),
        };
    }

    static benchmark(maxFiles: number, maxPaths: number, rounds: number, silent?: boolean) {
        return (new this(maxFiles, maxPaths, rounds, silent)).runTest();
    }
}
