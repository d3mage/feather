#! /usr/bin/env ts-node

import * as yargs from 'yargs';
import path from 'path';
import { main } from '../src';

const execute = async () => {
    const argv = await yargs.options({
        target: {
            alias: 't',
            default: './contracts/Structs.sol',
            description: 'Folder that contains target file'
        }, 
    }).argv;
    const rootFolder = path.resolve(__dirname, '../../../'); 
    const targetFile = path.resolve(rootFolder, argv.target);
    await main(targetFile);
    console.log("EIP712 generated :)");
}

execute();
