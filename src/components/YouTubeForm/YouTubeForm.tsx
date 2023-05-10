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

// Constants
import { EMAIL_FIELD_ADMIN_ERROR } from "./YoutubeForm.constants";

export const YouTubeForm: FC = () => {
  const form = useForm<YouTubeFormValues>();

  const { control, handleSubmit, formState } = form;
  const { isSubmitting, isDirty } = formState;

  const onSubmit = async (data: YouTubeFormValues) => {
    console.log("data :>> ", data);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };

  const customValidationEmailFn = (
    fieldValue: string,
    formValues: YouTubeFormValues
  ) => {
    if (fieldValue === "admin@example.com" || formValues.username === "Admin") {
      return EMAIL_FIELD_ADMIN_ERROR;
    }

    return true;
  };

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
