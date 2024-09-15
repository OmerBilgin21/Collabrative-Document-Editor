export interface IError {
  error: string;
}

export const NotFoundError = { error: "Item not found!" };
export const MissingParamsError = { error: "Missing params!" };
export const UserConflictError = { error: "User already exists!" };
export const IncorrectCredentialsError = { error: "Incorrect credentials!" };
export const DBCreationError = { error: "Error during record creation" };
export const TokenInvalidError = { error: "Provided access token is invalid" };
export const UnAuthorizedError = {
  error: "You do not have enough rights to perform this action",
};
