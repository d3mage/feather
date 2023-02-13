# Feather

Feather is a NPM package that simplifies development of an infrastructure for EIP712.  

## Installation

```bash
npm i feather-eip712 --save-dev
```

## Usage
```js
npx feather-eip712 -t "./contracts/Structs.sol" -os "./contracts/" -ot "./test/"
```
* ```-t``` - Path to target file
* ```-os``` - Output folder for Solidity files
* ```-ot``` - Output folder for TS files

## Contributing
Feel free to open issues with suggestions of a new functionality and bugfixes/optimizations etc.
