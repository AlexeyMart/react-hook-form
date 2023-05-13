import { ChangeEvent, useEffect, useCallback } from "react";
import {
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import debounce from "lodash.debounce";
import { YouTubeFormValues } from "../components/YouTubeForm/YoutubeForm.types";
import {
  ACCOUNT_FIELD_EXISTING_ERROR,
  DEFAULT_ERROR,
  REQUIRED_FIELD_ERROR,
} from "../components/YouTubeForm/YoutubeForm.constants";

interface UseAccountValidationParams {
  touched: boolean;
  value: string;
  setError: UseFormSetError<YouTubeFormValues>;
  setValue: UseFormSetValue<YouTubeFormValues>;
  clearErrors: UseFormClearErrors<YouTubeFormValues>;
}

const checkAndValidateAccount = async (
  value: string,
  setError: UseFormSetError<YouTubeFormValues>
): Promise<boolean> => {
  let isValid: boolean = false;

  if (!value) {
    setError("account", { message: REQUIRED_FIELD_ERROR });
    return isValid;
  }

  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });

    if (value !== "free") {
      setError("account", { message: ACCOUNT_FIELD_EXISTING_ERROR });
    } else {
      isValid = true;
    }
  } catch (error) {
    setError("account", { message: DEFAULT_ERROR });
  }

  return isValid;
};

const debouncedCheckAndValidateAccount = debounce(checkAndValidateAccount, 500);

export const useAccountValidation = ({
  touched,
  value,
  clearErrors,
  setError,
  setValue,
}: UseAccountValidationParams) => {
  useEffect(() => {
    if (!touched) {
      return;
    }

    debouncedCheckAndValidateAccount(value, setError);
  }, [value, setError, touched]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      clearErrors("account");
      setValue("account", event.target.value, {
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [clearErrors, setValue]
  );

  return { checkAndValidateAccount, onChange };
};
