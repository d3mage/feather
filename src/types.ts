export interface ScrappedStruct {
  structName: string;
  fields: ScrappedField[];
  typehash?: string;
}

export interface ScrappedField {
  dataType: Type;
  name: string;
}

export interface InitialStruct {
  name: string;
  members: InitialField[];
}

interface InitialField {
  typeName: Type;
  name: string;
}

interface Type {
  type: string;
  name?: string;
  baseTypeName?: ScrappedField;
}
