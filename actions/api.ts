import axios from "axios";

export const sendVerificationCode = async (email: string) => {
  try {
    console.log(email);

    const response = await axios.post(
      "/api/email/send",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      data: response.data,
      error: { error: false, message: "Error inesperado" },
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Error enviando el código:", error.response?.data.error);
      console.log();

      return { error: { error: true, message: error.response?.data.error } };
    } else {
      console.error("Error inesperado:", error);
      return { error: { error: true, message: "Error inesperado" } };
    }
  }
};
export const verifyCode = async (email: string, code: string) => {
  try {
    const response = await axios.post("/api/email/verify", { email, code });
    return {
      data: response.data,
      error: { error: false, message: "Error inesperado" },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error verificando el código:", error.response?.data.error);

      return { error: { error: true, message: error.response?.data.error } };
    } else {
      console.error("Error inesperado:", error);
      return { error: { error: true, message: "Error inesperado" } };
    }
  }
};
