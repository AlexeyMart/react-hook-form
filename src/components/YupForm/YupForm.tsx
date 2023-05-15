import { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// Components
import { Input } from "../form-elements/Input/Input";

// Styles
import "./YupForm.css";

// Types
import { YupFormValues } from "./YupForm.types";

// Constants
import { defaultValues } from "./YupForm.constants";

export const YupForm: FC = () => {
  const form = useForm<YupFormValues>({
    defaultValues,
  });

  const { control, handleSubmit, formState } = form;

  const { isSubmitting, isDirty } = formState;

  const onSubmit = async (data: YupFormValues) => {
    console.log("submitting... :>> ", data);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };

  return (
    <FormProvider {...form}>
      <form className="YupForm" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input name="username" label="Username" />

        <Input name="email" label="Email" type="email" />

        <Input name="channel" label="Channel" />

        <Input name="social.facebook" label="Facebook" />

        <Input name="social.twitter" label="Twitter" />

        <button
          disabled={isSubmitting || !isDirty}
          type="submit"
          className="YupForm__submit-button"
        >
          Submit
        </button>
      </form>

      <DevTool control={control} />
    </FormProvider>
  );
};
