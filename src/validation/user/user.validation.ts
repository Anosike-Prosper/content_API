import { validate } from "../../utils/validate";

export class UserValidator {
  constructor() {}

  createUserValidation = validate({
    username: {
      notEmpty: {
        errorMessage: "Please provide a username",
      },
      isString: { errorMessage: "username must be a string" },
      trim: true,
    },

    interests: {
      optional: true, 
      isArray: {
        errorMessage: "Interests must be an array of strings",
      },
      custom: {
        options: (value: any[]) => {
          if (!Array.isArray(value)) return false;
          if (!value.every((item) => typeof item === "string")) {
            throw new Error("Each interest must be a string");
          }
          return true;
        },
      },
    },
  });
}
