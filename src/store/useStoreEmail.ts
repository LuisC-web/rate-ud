import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type EmailVerificationState = {
  isVerified: boolean;
  setVerified: (value: boolean) => void;
  code: string;
  setCode: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  reset: () => void;
};

export const useEmailVerificationStore = create<EmailVerificationState>()(
  devtools(
    persist(
      (set) => ({
        isVerified: false,
        code: "",
        setCode: (value: string) => set({ code: value }),
        email: "",
        setEmail: (value: string) => set({ email: value }),
        setVerified: (value: boolean) => set({ isVerified: value }),
        reset: () => set({ isVerified: false, code: "", email: "" }),
      }),
      {
        name: "email-verification-storage",
      },
    ),
    {
      name: "EmailVerificationStore",
    },
  ),
);
