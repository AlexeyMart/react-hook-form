import { FC, ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import {
  EMAIL_FIELD_ERROR,
  REQUIRED_FIELD_ERROR,
  emailRegExp,
} from "../../YouTubeForm/YoutubeForm.constants";
import { get } from "../../YouTubeForm/YoutubeForm.helpers";

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
}) => {
  const { register, formState } = useFormContext<Record<string, any>>();
  // const { name, ref, onChange, onBlur } = register(name);

  const { errors } = formState;
  const errorMessage = get(errors, name)?.message;

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

      {errorMessage && typeof errorMessage === "string" && (
        <p className="error">{errorMessage}</p>
      )}
    </div>
  );
};
