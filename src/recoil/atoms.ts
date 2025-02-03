import { UserType } from "@/services/types/dataTypes";
import { atom } from "recoil";

export const userState = atom<UserType | null>({
  key: "userState", // unique ID
  default: null, // default value
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem("userState");
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue) => {
        if (newValue != null) {
          localStorage.setItem("userState", JSON.stringify(newValue));
        } else {
          localStorage.removeItem("userState");
        }
      });
    }
  ]
});
