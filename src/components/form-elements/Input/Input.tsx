import { FC, ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import {
  EMAIL_FIELD_ERROR,
  REQUIRED_FIELD_ERROR,
  emailRegExp,
} from "../../YouTubeForm/YoutubeForm.constants";

interface Props extends ComponentProps<"input"> {
  name: string;
  label: string;
  isRequired?: boolean;
}

export const Input: FC<Props> = ({
  name,
  label,
  type = "text",
  isRequired = false,
}) => {
  const { register, formState } = useFormContext();
  // const { name, ref, onChange, onBlur } = register("username");

  const { errors } = formState;
  const isError = !!errors[name];
  const errorMessage = isError && errors[name]?.message;

  return (
    <div className="form-control">
      <label>
        <p>{label}</p>
        <input
          // name={name}
          // ref={ref}
          // onChange={onChange}
          // onBlur={onBlur}
          type={type}
          {...register(name, {
            required: {
              value: isRequired,
              message: REQUIRED_FIELD_ERROR,
            },
            ...(type === "email"
              ? {
                  pattern: {
                    value: emailRegExp,
                    message: EMAIL_FIELD_ERROR,
                  },
                }
              : {}),
          })}
        />
      </label>

      {isError && typeof errorMessage === "string" && (
        <p className="error">{errorMessage}</p>
      )}
    </div>
  );
};
