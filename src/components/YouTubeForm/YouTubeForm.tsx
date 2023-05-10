import { FC } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./YouTubeForm.css";

interface FormValues {
  username: string;
  email: string;
  channel: string;
}

export const YouTubeForm: FC = () => {
  const form = useForm<FormValues>();
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = form;
  // const { name, ref, onChange, onBlur } = register("username");

  const onSubmit = async (data: FormValues) => {
    console.log("data :>> ", data);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };

  return (
    <>
      <form className="YoutubeForm" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Username</p>
          <input
            type="text"
            id="username"
            // name={name}
            // ref={ref}
            // onChange={onChange}
            // onBlur={onBlur}
            {...register("username")}
          />
        </label>

        <label>
          <p>Email</p>
          <input type="email" id="email" {...register("email")} />
        </label>

        <label>
          <p>Channel</p>
          <input type="text" id="channel" {...register("channel")} />
        </label>

        <button disabled={isSubmitting || !isDirty} type="submit">
          Submit
        </button>
      </form>

      <DevTool control={control} />
    </>
  );
};
