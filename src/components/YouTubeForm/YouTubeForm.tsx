import { FC } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// Components
import { Input } from "../form-elements/Input/Input";
// import { Test } from "./Test";

// Styles
import "./YouTubeForm.css";

// Types
import { YouTubeFormValues, PetWithId } from "./YoutubeForm.types";

// Helpers
import {
  customValidationEmailFn,
  onSubmit,
  getDefaultValues,
  validateSocial,
  validatePetField,
} from "./YoutubeForm.helpers";

// Constants
import { defaultValues } from "./YoutubeForm.constants";

export const YouTubeForm: FC = () => {
  const form = useForm<YouTubeFormValues>({
    defaultValues,
    // ALSO able to fetch some data and init defaultValues
    // defaultValues: getDefaultValues,
  });

  const { control, handleSubmit, formState } = form;

  const {
    fields: petFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "pets",
  });

  const renderPetField = (
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

  const { isSubmitting, isDirty } = formState;

  return (
    <FormProvider {...form}>
      <form
        className="YoutubeForm"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input name="username" label="Username" isRequired />

        <Input
          name="email"
          label="Email"
          isRequired
          type="email"
          validate={customValidationEmailFn}
        />

        <Input name="channel" label="Channel" isRequired />

        <Input
          name="social.facebook"
          label="Facebook"
          validate={validateSocial}
        />

        <Input
          name="social.twitter"
          label="Twitter"
          validate={validateSocial}
        />

        {petFields.map(renderPetField)}

        <Input name="age" label="Age" type="number" isRequired />

        <Input name="dob" label="DOB" type="date" />

        <button
          disabled={isSubmitting || !isDirty}
          type="submit"
          className="YoutubeForm__submit-button"
        >
          Submit
        </button>
      </form>

      <DevTool control={control} />

      {/* <Test control={control} /> */}
    </FormProvider>
  );
};
