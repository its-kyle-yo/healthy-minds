import path from "path";
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv

const outputFolder = __dirname + "/../../../output/"
const outfile = argv._.find((arg: any) => arg.endsWith("csv")) ?? 'output.csv'
const filepath = path.resolve(outputFolder, outfile)

console.log(`Creating ${outfile} in ./output`);

export {filepath}