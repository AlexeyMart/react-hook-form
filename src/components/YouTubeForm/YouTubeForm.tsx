import { FC, useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// Components
import { Input } from "../form-elements/Input/Input";
// import { Test } from "./Test";

// Styles
import "./YouTubeForm.css";

// Types
import { YouTubeFormValues } from "./YoutubeForm.types";

// Helpers
import {
  customValidationEmailFn,
  onSubmit,
  getDefaultValues,
  validateSocial,
  renderPetField,
} from "./YoutubeForm.helpers";

// Constants
import { defaultValues } from "./YoutubeForm.constants";

export const YouTubeForm: FC = () => {
  const form = useForm<YouTubeFormValues>({
    defaultValues,
    // ALSO able to fetch some data and init defaultValues
    // defaultValues: getDefaultValues,
  });

  const { control, handleSubmit, formState, watch } = form;

  // пример для трекинга значений формы
  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  const {
    fields: petFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "pets",
  });

  const { isSubmitting, isDirty } = formState;

  // const watchFormValues = watch();  for all form values
  const watchUserName = watch("username");

  return (
    <FormProvider {...form}>
      <form
        className="YoutubeForm"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2>WatchedUserName: {watchUserName}</h2>

        <Input
          name="username"
          label="Username"
          isRequired
          style={{ color: watchUserName === "Batman" ? "#315efb" : "black" }}
        />

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

        {petFields.map(renderPetField(append, remove))}

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
