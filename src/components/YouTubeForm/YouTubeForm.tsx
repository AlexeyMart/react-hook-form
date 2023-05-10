import { FC } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./YouTubeForm.css";

export const YouTubeForm: FC = () => {
  const form = useForm();
  const { register, control } = form;
  // const { name, ref, onChange, onBlur } = register("username");

  return (
    <>
      <form className="YoutubeForm">
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

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </>
  );
};
