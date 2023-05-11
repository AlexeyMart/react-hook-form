import {
  defaultValues,
  EMAIL_FIELD_ADMIN_ERROR,
  SOCIAL_FIELD_ERROR,
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
  formValues: Record<string, any>
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

export const validateSocial = (
  _fieldValue: string,
  formValues: Record<string, any>
) => {
  if (Boolean(formValues.social.twitter || formValues.social.facebook)) {
    return true;
  }

  return SOCIAL_FIELD_ERROR;
};

export const getByPathInObj = (obj: Record<string, any>, path: string) =>
  path.split(".").reduce((acc, item) => acc?.[item], obj);
