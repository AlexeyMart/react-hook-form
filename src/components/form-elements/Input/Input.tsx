import { FC, ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import {
  EMAIL_FIELD_ERROR,
  REQUIRED_FIELD_ERROR,
  emailRegExp,
} from "../../YouTubeForm/YoutubeForm.constants";
import { YouTubeFormValues } from "../../YouTubeForm/YoutubeForm.types";

interface Props extends ComponentProps<"input"> {
  name: keyof YouTubeFormValues;
  label: string;
  isRequired?: boolean;
  validate?: (fieldValue: string, formValues: YouTubeFormValues) => any;
}

export const Input: FC<Props> = ({
  name,
  label,
  validate,
  type = "text",
  isRequired = false,
}) => {
  const { register, formState } = useFormContext<YouTubeFormValues>();
  // const { name, ref, onChange, onBlur } = register(name);

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
            validate,

            // ALSO POSSIBLE PASS SEVERAL FUNCTIONS. TYPES WILL BE INFERED
            // validate: {
            //   notAdmin: (fieldValue, formValues) => {
            //     return true;
            //   },
            //   notBlackListed: (fieldValue, formValues) => {
            //     return true;
            //   },
            // },
          })}
        />
      </label>

      {isError && typeof errorMessage === "string" && (
        <p className="error">{errorMessage}</p>
      )}
    </div>
  );
};
