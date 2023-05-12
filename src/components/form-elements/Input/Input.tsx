import { FC, ComponentProps } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import {
  EMAIL_FIELD_ERROR,
  REQUIRED_FIELD_ERROR,
  emailRegExp,
} from "../../YouTubeForm/YoutubeForm.constants";
import { getByPathInObj } from "../../YouTubeForm/YoutubeForm.helpers";

interface Props extends ComponentProps<"input"> {
  name: string;
  label: string;
  isRequired?: boolean;
  validate?: (fieldValue: string, formValues: Record<string, any>) => any;
}

export const Input: FC<Props> = ({
  name,
  label,
  validate,
  type = "text",
  isRequired = false,
  disabled,
  ...rest
}) => {
  const { register, formState } = useFormContext<Record<string, any>>();
  // const { name, ref, onChange, onBlur } = register(name);

  const { errors } = formState;
  const errorMessage = getByPathInObj(errors, name)?.message;

  const registerOptions = {
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
    ...(type === "number" ? { valueAsNumber: true } : {}),
    ...(type === "date" ? { valueAsDate: true } : {}),

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

    // disabled
    // in register disabled: true option prevent validation and set field value to undefined in case of submit
  };

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
          disabled={disabled}
          {...register(name, registerOptions as RegisterOptions)}
          {...rest}
        />
      </label>

      {errorMessage && typeof errorMessage === "string" && (
        <p className="error">{errorMessage}</p>
      )}
    </div>
  );
};
