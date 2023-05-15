import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObject, TestContext, object, string } from "yup";
import { EMAIL_FIELD_ERROR, REQUIRED_FIELD_ERROR } from "../../constants";

const validateChannel = (
  value: string | undefined,
  context: TestContext<AnyObject>
) => {
  // context.parent === all values
  if (!!context?.parent?.username) {
    return true;
  }

  if (!value) {
    return false;
  }

  return true;
};

const validateSocialFacebook = (
  value: string | undefined,
  context: TestContext<AnyObject>
) => {
  // context.parent === values from nested object
  if (!!context?.parent?.twitter) {
    return true;
  }

  if (!value) {
    return false;
  }

  return true;
};

const validationSchema = object({
  username: string().when(["email", "channel"], {
    is: (email: string | undefined, channel: string | undefined) => {
      if (email || channel) {
        return false;
      }

      return true;
    },
    then: (schema) => schema.required(REQUIRED_FIELD_ERROR),
  }),
  email: string().required(REQUIRED_FIELD_ERROR).email(EMAIL_FIELD_ERROR),
  channel: string().test("channel", REQUIRED_FIELD_ERROR, validateChannel),
  social: object({
    facebook: string().test(
      "social.facebook",
      REQUIRED_FIELD_ERROR,
      validateSocialFacebook
    ),
    twitter: string().required(REQUIRED_FIELD_ERROR),
  }),
});

export const resolver = yupResolver(validationSchema);
