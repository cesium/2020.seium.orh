import { useState, useRef } from "react";
import { sendResetEmail } from "@lib/api";

import ImageButton from "@components/ImageButton";

import Form from "@components/Form";
import Input from "@components/Input";
import Text from "@layout/lazuli/authentication/Text";

export default function ForgotPasswordForm() {
  const [success, updateSuccess] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const emailRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const email = emailRef.current.value;

    sendResetEmail({ email })
      .then(() => updateSuccess(true))
      .catch(() => updateSuccess(false))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {!success && (
        <div className="mt-8">
          <Form onSubmit={onSubmit}>
            <Input
              text="YOUR EMAIL"
              id="email"
              name="email"
              type="email"
              fgColor="white"
              bgColor="primary"
              autoComplete="email"
              ref={emailRef}
            />
            <ImageButton
              type="submit"
              text="LET’S GO"
              customStyle="text-secondary bg-quinary border-quinary"
              imageSrc={isLoading ? "/images/loading.gif" : ""}
              imageAlt="HANG TIGHT..."
              disabled={isLoading}
            />
          </Form>
        </div>
      )}

      {success == false && (
        <p className="mt-10 font-iregular text-red-600">
          An error has occured. Please make sure the email you provided is
          correct and try again later
        </p>
      )}

      {success && (
        <p className="mt-10 font-iregular text-quinary">
          An email has bent sent. Please check your inbox to reset your password
        </p>
      )}

      {!success && (
        <Text
          text="Don’t have an account?"
          link="Register here"
          href="/signup"
        />
      )}
    </>
  );
}
