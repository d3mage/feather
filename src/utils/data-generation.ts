import { faker } from '@faker-js/faker';

export const generateAddressData = (): string => {
  return '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
};

export const generateStringData = (): string => {
  return faker.name.firstName();
};

export const generateUintData = (): number => {
  return faker.datatype.number({ max: 1e4 });
};

export const generateArrayUintData = (): number[] => {
  const arr = [];
  for (let i = 0; i < 10; ++i) {
    arr.push(generateUintData());
  }
  return arr;
};
