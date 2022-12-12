import { parse } from '@solidity-parser/parser';
import { ScrappedStruct, InitialStruct } from '../types';

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
