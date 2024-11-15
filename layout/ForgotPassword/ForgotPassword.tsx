import { motion as Motion } from "framer-motion";

import Card from "@components/Card";
import Return from "@components/Return";

import Title from "@layout/lazuli/authentication/Title";

import { ForgotPasswordForm } from "./components";

function ForgotPassword() {
  return (
    <div className="min-h-screen overflow-hidden bg-secondary">
      <Return componentStyle="sm:ml-14 mt-10 sm:mt-20" />
      <div className="my-10 flex flex-col items-center justify-center sm:mt-40">
        <Title text="Reset password" />
        <ForgotPasswordForm />
        <div className="absolute bottom-0 right-60 hidden lg:block">
          <Motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card img="/images/void.svg" alt="MascotFooter" inverted={false}>
              Happens to the best of us, don’t worry
            </Card>
          </Motion.div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
