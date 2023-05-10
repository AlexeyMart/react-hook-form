import { FC } from "react";
import { Control, useFormState } from "react-hook-form";
import { YouTubeFormValues } from "./YoutubeForm.types";

interface Props {
  control: Control<YouTubeFormValues, any>;
}

export const Test: FC<Props> = ({ control }) => {
  const { errors, isSubmitting, isDirty, touchedFields } = useFormState({
    control,
  });

  console.log("errors :>> ", errors);
  console.log("isDirty :>> ", isDirty);
  console.log("isSubmitting :>> ", isSubmitting);
  console.log("touchedFields :>> ", touchedFields);

  return <div>Implement me</div>;
};
