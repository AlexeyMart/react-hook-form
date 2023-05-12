import { FC, useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// Components
import { Input } from "../form-elements/Input/Input";
import { Loader } from "../Loader/Loader";
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
  onSubmitError,
} from "./YoutubeForm.helpers";

// Constants
import { defaultValues } from "./YoutubeForm.constants";

export const YouTubeForm: FC = () => {
  const form = useForm<YouTubeFormValues>({
    defaultValues,
    // ALSO able to fetch some data and init defaultValues
    // defaultValues: getDefaultValues,
  });

  const {
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;

  const { isSubmitting, isDirty, isSubmitSuccessful } = formState;

  // example how to track and manipulate form values
  useEffect(() => {
    const subscription = watch((formValues) => {
      // console.log("formValues :>> ", formValues);
      // possible to use setValue method
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue]);

  // reset form after successful submit (this is recommended way, not in onSubmit fn)
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const {
    fields: petFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "pets",
  });

  const handleGetValues = () => {
    const formValues = getValues();
    console.log("formValues", formValues);
    // also possible get field value
    const socialValue = getValues("social");
    console.log("socialValue :>> ", socialValue);
    // and several fields values
    const [username, email] = getValues(["username", "email"]);
    console.log("username, email :>> ", username, email);
  };

  const handleSetValue = () => {
    setValue("username", "Superman", {
      // for imitate user action
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  // const watchFormValues = watch(); // for all form values, always trigger rerender
  const watchUserName = watch("username"); // trigger rerender always on username changes

  return (
    <FormProvider {...form}>
      <form
        className="YoutubeForm"
        onSubmit={handleSubmit(onSubmit, onSubmitError)}
        noValidate
      >
        <h2>WatchedUserName: {watchUserName}</h2>

        <Input
          name="username"
          label="Username"
          isRequired
          style={{ color: watchUserName === "Batman" ? "#315efb" : "black" }}
          disabled
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
          disabled={watch("social.facebook") !== ""}
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

        <button onClick={handleGetValues} type="button">
          Get Values
        </button>

        <button onClick={handleSetValue} type="button">
          Set Value
        </button>

        <button onClick={() => reset()} type="button">
          Reset form
        </button>
      </form>

      <DevTool control={control} />

      {isSubmitting && <Loader className="YoutubeForm__loader" />}

      {/* <Test control={control} /> */}
    </FormProvider>
  );
};
