import { FC } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// Styles
import "./YouTubeForm.css";

// Types
import { YouTubeFormValues } from "./YoutubeForm.types";

// Constants
import {
  REQUIRED_FIELD_ERROR,
  EMAIL_FIELD_ERROR,
  emailRegExp,
} from "./YoutubeForm.constants";

export const YouTubeForm: FC = () => {
  const form = useForm<YouTubeFormValues>();

  const { register, control, handleSubmit, formState } = form;
  // const { name, ref, onChange, onBlur } = register("username");

  const { isSubmitting, isDirty, errors } = formState;

  const onSubmit = async (data: YouTubeFormValues) => {
    console.log("data :>> ", data);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };

  console.log("formState :>> ", formState);

  return (
    <>
      <form
        className="YoutubeForm"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label>
          <p>Username</p>
          <input
            type="text"
            id="username"
            // name={name}
            // ref={ref}
            // onChange={onChange}
            // onBlur={onBlur}
            {...register("username", { required: REQUIRED_FIELD_ERROR })}
          />
        </label>

        <label>
          <p>Email</p>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: REQUIRED_FIELD_ERROR,
              },
              pattern: {
                value: emailRegExp,
                message: EMAIL_FIELD_ERROR,
              },
            })}
          />
        </label>

        <label>
          <p>Channel</p>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: REQUIRED_FIELD_ERROR })}
          />
        </label>

        <button disabled={isSubmitting || !isDirty} type="submit">
          Submit
        </button>
      </form>

      <DevTool control={control} />
    </>
  );
};
