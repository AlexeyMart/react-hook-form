import { UseFormSetError } from "react-hook-form";

export interface Pet {
  name: string;
  kind: string;
}

export interface PetWithId extends Pet {
  id: string;
}

export interface YouTubeFormValues {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  pets: Pet[];
  age: number;
  dob: Date;
  account: string;
}

export interface CheckAccountParams {
  value: string;
  setError: UseFormSetError<YouTubeFormValues>;
}
