import { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
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

        <button disabled={isSubmitting || !isDirty} type="submit">
          Submit
        </button>
      </form>

      <DevTool control={control} />

      {/* <Test control={control} /> */}
    </FormProvider>
  );
};
