#! /usr/bin/env ts-node

import * as yargs from 'yargs';
import path from 'path';
import { main } from '../src';

const execute = async () => {
    const argv = await yargs.options({
        target: {
            alias: 't',
            default: './contracts/Structs.sol',
            description: 'Path to target file'
        },
        outputFolderSol: {
            alias: 'os',
            default: './contracts/',
            description: 'Output folder for Solidity files'
        },
        outputFolderTS: {
            alias: 'ot',
            default: './test/',
            description: 'Output folder for TS files'
        }
    }).argv;
    const rootFolder = path.resolve(__dirname, '../../../'); 
    const targetFile = path.resolve(rootFolder, argv.target);
    const solFolder = path.resolve(rootFolder, argv.outputFolderSol);
    const tsFolder = path.resolve(rootFolder, argv.outputFolderTS);
    await main(targetFile, solFolder, tsFolder);
    console.log("EIP712 generated :)");
}

execute();
