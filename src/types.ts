export interface Struct {
  name: string;
  members: Member[];
}

export interface Member { 
  typeName: Type;
  name: string;
}

interface Type {
  type: string;
  name?: string;
  baseTypeName?: Member;
}