import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth, database } from "./firebase";
import { get, ref, set } from "firebase/database";

// 구글 로그인 호출
export const firebaseGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // 유저 찾기 및 새 유저 등록
    const userData = await getUserData(user);
    return userData 
  } catch (error) {
    console.error("google로그인 에러", error);
  }
};

// firebase DB에서 유저 찾기
const getUserData = async (user: User) => {
  try {
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = await snapshot.val();
      return userData;
    } else {
      const newUser = await createNewUser(user);
      return newUser;
    }
  } catch (error) {
    console.error(error);
  }
};

// firebase DB에 유저 저장하기
const createNewUser = async (user: User) => {
  try {
    const newUser = {
      userId: user.uid,
      username: user.displayName,
      email: user.email,
      phone: user.phoneNumber,
      avatar: user.photoURL
    };
    const userRef = ref(database, `users/${newUser.userId}`);
    await set(userRef, newUser);
    return newUser;
  } catch (error) {
    console.error(error);
  }
};
