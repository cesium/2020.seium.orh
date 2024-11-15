import { motion as Motion } from "framer-motion";

import Card from "@components/Card";
import Return from "@components/Return";

import Title from "@layout/lazuli/authentication/Title";
import { ResetPasswordForm } from "./components";

export async function getServerSideProps({ query }) {
  if (query.token === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

function Reset() {
  return (
    <div className="min-h-screen overflow-hidden bg-secondary">
      <Return componentStyle="sm:ml-14 mt-10 sm:mt-20 mb-20" />
      <div className="flex flex-col items-center justify-center sm:mt-40">
        <Title text="Recover your password" />
        <ResetPasswordForm />
        <div className="absolute bottom-0 right-60 hidden lg:block">
          <Motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card img="/images/void.svg" alt="MascotFooter" inverted={false}>
              Try to not forget your password
            </Card>
          </Motion.div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
