import { parse } from "@solidity-parser/parser"
import { Struct } from "../types";

export const parseStructs = (file: string): Struct[] => {
    const children = parse(file).children.slice(1); //remove pragma
    const structs: Struct[] = children as unknown as Struct[];
    return structs;    
} 