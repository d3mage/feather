import { faker } from '@faker-js/faker';

export const generateBytesData = (bytesNumber: number): string => {
  return faker.datatype.hexadecimal({ length: bytesNumber * 2 });
};

export const generateUintData = (): number => {
  return faker.datatype.number({ max: 1e4 });
};

export const generateBoolData = (): boolean => {
  return faker.datatype.boolean();
};

export const generateAddressData = (): string => {
  return '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
};

export const generateStringData = (): string => {
  return faker.name.firstName();
};
