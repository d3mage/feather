import { faker } from '@faker-js/faker';

export const generateBytesData = (bytesNumber: number): string => {
  return faker.datatype.hexadecimal({ length: bytesNumber * 2 });
};

export const generateUintData = (max: number = 1e4): number => {
  return faker.datatype.number({ max });
};

export const generateHexData = (): string => {
  return '0x' + generateUintData(1e2);
};

export const generateBoolData = (): boolean => {
  return faker.datatype.boolean();
};

export const generateAddressData = (): string => {
  return faker.finance.ethereumAddress();
};

export const generateStringData = (): string => {
  return faker.name.firstName();
};
