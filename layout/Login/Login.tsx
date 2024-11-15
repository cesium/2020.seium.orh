/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { motion as Motion } from "framer-motion";

import { useAuth } from "@context/Auth";

import Card from "@components/Card";
import { Router, useRouter } from "next/router";

import Return from "@components/Return";

import Title from "@layout/lazuli/authentication/Title";
import Text from "@layout/lazuli/authentication/Text";
import { LoginForm } from "./components";

function Login() {
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.replace(
      (router.query.from && decodeURIComponent(router.query.from as string)) ??
        "/"
    );
    return null;
  }

  return (
    <div className="min-h-screen select-none overflow-hidden bg-secondary">
      <Return componentStyle="sm:ml-20 mt-20 sm:mt-20 z-10 sm:pl-10" />
      <img
        className="absolute -left-[380px] bottom-0 hidden w-[750px] xl:block"
        src="/images/void.svg"
      />
      <div className="z-8 mt-10 flex flex-col items-center justify-center sm:mt-40">
        <Title text="Log in" />
        <LoginForm />
        <Text
          text="Don’t have an account?"
          link="Register here"
          href="/signup"
        />
      </div>
    </div>
  );
}

export default Login;
