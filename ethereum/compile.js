const path = require('path');
const solc = require('solc');
const fs = require('fs-extra'); // file system module, Community made module with extra functions than fs

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); //delete everything inside the build folder and the folder itself

const assetPath = path.resolve(__dirname, 'contracts', 'Asset.sol');
const source = fs.readFileSync(assetPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // Create build folder

// Loop over output contracts and create one file per contract
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
