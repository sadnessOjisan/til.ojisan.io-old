import { isPost, isPosts, PostType } from "../entity/Post";
import { Fetch } from "../infra/fetch";
import Firebase from "../infra/firebaseClient";
import { ApiResponseType } from "../type/util";

export const signin = async (mail: string, password: string): Promise<void> => {
  await Firebase.instance.auth.signInWithEmailAndPassword(mail, password);
};
