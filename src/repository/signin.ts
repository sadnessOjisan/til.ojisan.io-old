import Firebase from "../infra/FirebaseClient";

export const signin = async (mail: string, password: string): Promise<void> => {
  await Firebase.instance.auth.signInWithEmailAndPassword(mail, password);
};
