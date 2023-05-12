import {
  FieldErrors,
  SubmitErrorHandler,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { Input } from "../form-elements/Input/Input";
import {
  defaultValues,
  EMAIL_FIELD_ADMIN_ERROR,
  SOCIAL_FIELD_ERROR,
  REQUIRED_FIELD_ERROR,
  ACCOUNT_FIELD_EXISTING_ERROR,
} from "./YoutubeForm.constants";
import { Pet, PetWithId, YouTubeFormValues } from "./YoutubeForm.types";

export const onSubmit = async (data: YouTubeFormValues) => {
  console.log("submitting :>> ", data);

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

// executing in case of validation errors
export const onSubmitError: SubmitErrorHandler<YouTubeFormValues> = (
  errors: FieldErrors<YouTubeFormValues>
) => {
  console.log("errors :>> ", errors);
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

const validatePetField =
  (type: keyof Pet, index: number) =>
  (_fieldValue: string, formValues: Record<string, any>) => {
    const { kind, name } = formValues.pets[index];

    if (type === "kind" && !kind && name) {
      return REQUIRED_FIELD_ERROR;
    }

    if (type === "name" && !name && kind) {
      return REQUIRED_FIELD_ERROR;
    }

    return true;
  };

export const renderPetField =
  (
    append: UseFieldArrayAppend<YouTubeFormValues, "pets">,
    remove: UseFieldArrayRemove
  ) =>
  (
    // id автоматически генерируется react-hook-form
    { id, kind, name }: PetWithId,
    index: number,
    arr: PetWithId[]
  ) => {
    const handleRemovePhoneField = () => remove(index);
    const handleAddPhoneField = () => append({ kind: "", name: "" });

    return (
      <div key={id}>
        <div className="YoutubeForm__pets">
          <Input
            name={`pets.${index}.kind`}
            label={`Pet ${index + 1} kind`}
            validate={validatePetField("kind", index)}
          />

          <Input
            name={`pets.${index}.name`}
            label={`Pet ${index + 1} name`}
            validate={validatePetField("name", index)}
          />
        </div>

        <div className="YoutubeForm__pets-buttons">
          {arr.length !== 1 && (
            <button type="button" onClick={handleRemovePhoneField}>
              Remove pet
            </button>
          )}

          <button type="button" onClick={handleAddPhoneField}>
            Add pet
          </button>
        </div>
      </div>
    );
  };

export const validateAccount = async (fieldValue: string) => {
  console.log("fieldValue :>> ", fieldValue);

  const check = await new Promise((resolve) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });

  if (!check) {
    return ACCOUNT_FIELD_EXISTING_ERROR;
  }

  return true;
};
