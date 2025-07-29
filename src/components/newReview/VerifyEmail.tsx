import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { sendVerificationCode, verifyCode } from "../../../actions/api";
type VerifyEmailProps = { setVerified: () => void };
function VerifyEmail({ setVerified }: VerifyEmailProps) {
  const [sendCode, setSendCode] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.length && !sendCode) {
      toast.error("El correo no es valido");
      return;
    }
    if (!sendCode) {
      const response = await sendVerificationCode(email);
      if (response.error.error) {
        toast.error(response.error.message);
        return;
      }
      toast.success("Codigo enviado con exito al correo");
      setSendCode(true);
      return;
    }
    if (sendCode) {
      const response = await verifyCode(email, code);
      if (response.error.error) {
        toast.error(response.error.message);
        return;
      }
      toast.success("Codigo verificado con exito");
      setVerified();
    }
  };
  return (
    <div className="flex h-full items-center justify-center p-5 md:w-screen">
      <div className="border-primary mx-auto w-full max-w-xl rounded-xl border-2 p-15">
        <h1 className="mb-3 text-2xl">Verificar Email</h1>
        <form
          className="flex flex-col space-y-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">Correo</label>
            <input
              name="email"
              className="bg-primary-light border-primary w-full rounded-2xl border-2 px-5 py-2 focus:outline-0"
              placeholder="example@udistrital.edu.co"
              disabled={sendCode}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
            />
          </div>
          {sendCode && (
            <div className="flex flex-col space-y-2">
              <label htmlFor="coder">Codigo:</label>
              <input
                name="code"
                className="bg-primary-light border-primary w-full rounded-2xl border-2 px-5 py-2 focus:outline-0"
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          )}

          <input
            type="submit"
            className="bg-primary-light text-primary border-primary hover:bg-primary-light/80 active:bg-primary-light/80 cursor-pointer rounded-2xl border-2 p-2.5 font-black"
            value={`${sendCode ? "Validar codigo" : "Enviar codigo"}`}
          />
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
