import { YouTubeFormValues } from "./YoutubeForm.types";

export const REQUIRED_FIELD_ERROR = "Required field";

export const EMAIL_FIELD_ERROR = "Invalid email";

export const EMAIL_FIELD_ADMIN_ERROR = "Enter a different email";

export const SOCIAL_FIELD_ERROR = "Fill at least one social";

export const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const defaultValues: YouTubeFormValues = {
  username: "Batman",
  email: "example@example.com",
  channel: "Some Channel",
  social: {
    facebook: "",
    twitter: "",
  },
  pets: [{ kind: "", name: "" }],
  age: 0,
  dob: new Date(),
};
