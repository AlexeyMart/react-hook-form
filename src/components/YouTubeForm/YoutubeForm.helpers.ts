import {
  defaultValues,
  EMAIL_FIELD_ADMIN_ERROR,
  SOCIAL_FIELD_ERROR,
  REQUIRED_FIELD_ERROR,
} from "./YoutubeForm.constants";
import { Pet, YouTubeFormValues } from "./YoutubeForm.types";

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

export const validatePetField =
  (type: keyof Pet, index: number) =>
  (_fieldValue: string, formValues: Record<string, any>) => {
    const { kind, name } = formValues.pets[index];

    if (type === "kind") {
      if (!kind && name) {
        return REQUIRED_FIELD_ERROR;
      }
    }

    if (type == "name") {
      if (!name && kind) {
        return REQUIRED_FIELD_ERROR;
      }
    }

    return true;
  };
