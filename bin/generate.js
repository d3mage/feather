#! /usr/bin/env node

const { execSync } = require('child_process');

const command = `npm run build`;
execSync(command);
console.log("Files EIP712 generated :)");