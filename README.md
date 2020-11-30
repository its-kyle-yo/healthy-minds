# Healthy Minds Coding Challenge
A coding assessment for Healthy Minds based on [this criteria](./CRITERIA.md)

## Usage

`npm start <filename.csv>` / `npm run start <filename.csv>`: Build and run the application creating the file in the `./output` folder
`npm run build`: Compiles the `./src` folder into JS from TS to the `./build` folder
`node ./build/src/index.js <filename.csv>`: Run the build created with `npm run build` from the `./build` folder directly with node
`yarn run start <filename.csv>`: Same as `npm start...` but with `yarn`

## Dependencies

* node@12.18.0
* npm@6.14.4
* typescript@next
* nodemon@2.0.6
* axios@0.14.0
* ts-node@9.0.0
* csv-writer@1.6.0
* yargs@16.1.1

#### Types

* @types/axios
* @types/node
