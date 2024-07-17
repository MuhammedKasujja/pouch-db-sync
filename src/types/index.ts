export interface BaseEntity {
  id?: string;
  revId?: string;
}

export interface Patient extends BaseEntity {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  ssn: string;
  dob: string;
  race: string;
  language: string;
  active: boolean;
  completed: true | false;
}
