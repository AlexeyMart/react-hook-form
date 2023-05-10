import {
  EMAIL_FIELD_ADMIN_ERROR,
  defaultValues,
} from "./YoutubeForm.constants";
import { YouTubeFormValues } from "./YoutubeForm.types";

export const onSubmit = async (data: YouTubeFormValues) => {
  console.log("data :>> ", data);

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

export const customValidationEmailFn = (
  fieldValue: string,
  formValues: YouTubeFormValues
) => {
  if (fieldValue === "admin@example.com" || formValues.username === "Admin") {
    return EMAIL_FIELD_ADMIN_ERROR;
  }

  return true;
};

export const getDefaultValues = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });

  return defaultValues;
};
