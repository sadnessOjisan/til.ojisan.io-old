import Firebase from "../infra/firebaseClient";

export const signin = async (mail: string, password: string): Promise<void> => {
  await Firebase.instance.auth.signInWithEmailAndPassword(mail, password);
};
