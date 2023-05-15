import { YouTubeFormValues } from "./YoutubeForm.types";

export const defaultValues: YouTubeFormValues = {
  username: "Batman",
  // email: "example@example.com",
  email: "",
  channel: "",
  social: {
    facebook: "fb",
    twitter: "",
  },
  pets: [{ kind: "", name: "" }],
  age: 0,
  dob: new Date(),
  account: "",
};
