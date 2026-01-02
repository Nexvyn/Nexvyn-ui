const { execSync } = require("child_process")
const fs = require("fs")

try {
  execSync("npx tsc --noEmit", {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
    maxBuffer: 10 * 1024 * 1024,
  })
  console.log("No TypeScript errors!")
} catch (e) {
  const output = e.stdout || e.stderr || ""
  fs.writeFileSync("ts-errors.txt", output, "utf8")

  const lines = output.split("\n")
  const errorLines = lines.filter((l) => l.includes("error TS"))

  console.log(`Found ${errorLines.length} errors`)
  console.log("\nFirst 20 errors:")
  errorLines.slice(0, 20).forEach((line) => {
    console.log(line)
  })
}
