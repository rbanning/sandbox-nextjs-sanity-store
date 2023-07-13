
export interface IHarryPotterName {
  id: string;
  name: string;
  alternate_names: string[]
}

export interface IHarryPotterBrief extends IHarryPotterName {
  species: string;
  gender: string;
  yearOfBirth: number | null;
  wizard: boolean;
  ancestry: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  house: string;
  alive: boolean;
}

export const anyToHarryPotterName = (data: any): IHarryPotterName => {
  return {
    id: data.id ?? `id-${Math.floor(Math.random() * 100000)}`,
    name: data.name ?? null,
    alternate_names: data.alternate_names ?? []
  };
}

export const anyToHarryPotterBrief = (data: any): IHarryPotterBrief => {  
  return {
    ...anyToHarryPotterName(data),
    species: data.species ?? '',
    gender: data.gender ?? '',
    yearOfBirth: data.yearOfBirth ?? null,
    wizard: data.wizard ?? false,
    ancestry: data.ancestry ?? '',
    hogwartsStudent: data.hogwartsStudent ?? false,
    hogwartsStaff: data.hogwartsStaff ?? false,
    house: data.house ?? '',
    alive: data.alive ?? false,
  };
}


export type CompareHarryPotterMethods = 'name' | 'house' | 'yearOfBirth' | 'species';
export type CompareHarryPotterOrder = 'ASC' | 'DESC';

export const compareHarryPotterRecords = 
  <T extends Partial<IHarryPotterBrief>>(
      method: CompareHarryPotterMethods, 
      order: CompareHarryPotterOrder = 'ASC') => {

  const stringCompare = (a?: string, b?: string) => (a ?? '').localeCompare(b ?? '');

  const buildComparer = (method: CompareHarryPotterMethods, order: CompareHarryPotterOrder) => {
    return (a: T, b: T) => {
      const aRef = order === 'DESC' ? b : a;
      const bRef = order === 'DESC' ? a : b;
      switch ( method ) {
        case 'name':
          return stringCompare(aRef.name, bRef.name);
        case 'house':
          return stringCompare(aRef.house, bRef.house);
        case 'yearOfBirth':
          return (aRef.yearOfBirth ?? 0) - (bRef.yearOfBirth ?? 0);
        case 'species':
          return stringCompare(aRef.species, bRef.species);
        default:
          return stringCompare(aRef.name, bRef.name);
      }
    }
  }

  return (a: T, b: T) => {
    let result = buildComparer(method, order)(a,b);
    if (result === 0 && method !== 'name') {
      result = buildComparer('name', 'ASC')(a,b);
    }
    return result;
  }
  
}