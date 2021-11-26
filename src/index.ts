import { Benchmark, TestResults } from "./benchmark";

async function GetTestMatrix(width: number, height: number, stepWidth: number, stepHeight: number, rounds: number) {
    const matrix: TestResults[][] = [];
    for (let i = 0; i < width; i++) {
        const row: TestResults[] = [];
        for (let j = 0; j < height; j++) {
            row[j] = await Benchmark.benchmark((i+1)*stepWidth, (j+1)*stepHeight, 10, rounds, true);
            console.info(`Progress: (${(i*height)+j}/${width*height})`);
        }
        matrix[i] = row;
    }
    console.table(matrix.map(v => v.map(vv => Math.round(vv.average))));
}

(async () => {
    await GetTestMatrix(20, 10, 10, 10, 5);
})();
