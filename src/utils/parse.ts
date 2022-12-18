import { parse } from '@solidity-parser/parser';
import { ScrappedStruct, InitialStruct } from '../types';
//todo: preprocess some of the data here to lessen amount of same for loop iterations in different files
//i think i can make this generate all the necessary data whereas all the other file just arrange it in a proper way 
export const parseStructs = (file: string): ScrappedStruct[] => {
  const children = parse(file).children.slice(1); //remove pragma
  const structs: InitialStruct[] = children as unknown as InitialStruct[];
  const scrappedStructs: ScrappedStruct[] = structs.map((struct) => {
    const structName = struct.name;
    const fields = struct.members.map((member) => {
      const dataType = member.typeName;
      const name = member.name;
      return { dataType, name }
    });
    return { structName, fields }
  });
  return scrappedStructs;
};
