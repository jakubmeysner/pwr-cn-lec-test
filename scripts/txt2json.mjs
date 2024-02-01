import * as fs from "fs/promises"
import path from "path"

const [inputDirectory, outputFile] = process.argv.slice(2)

if (inputDirectory === undefined || outputFile === undefined) {
    console.error("Usage: txt2json <inputDirectory> <outputFile>")
    process.exit(1)
}

const files = await fs.readdir(inputDirectory, {
    encoding: "utf-8",
})

const questions = await Promise.all(
    files
        .filter((filename) => filename.endsWith(".txt"))
        .map(readQuestion),
)

await fs.writeFile(outputFile, JSON.stringify(questions))

async function readQuestion(filename) {
    const file = await fs.readFile(path.join(inputDirectory, filename), {
        encoding: "utf-8",
    })

    const lines = file
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length !== 0)

    return {
        id: parseInt(lines[1].split(".")[0]),
        question: lines[1].split("\t")[1].trim(),
        answers: lines.slice(2).map((line, index) => {
            return {
                id: index + 1,
                answer: line.slice(4),
                correct: lines[0][2 + index] === "1",
            }
        }),
    }
}
