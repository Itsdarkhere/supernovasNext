import { User } from "../backendapi-context";

export class LoggedInUserObservableResult {
  public loggedInUser: User;

  // Does this user have the same pubkey as the previous user?
  public isSameUserAsBefore: boolean;
}
