import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion as Motion } from "framer-motion";

import { useAuth } from "@context/Auth";

import { getCourses } from "@lib/api";

import Button from "@components/Button";
import Card from "@components/Card";
import Return from "@components/Return";
import Form from "@components/Form";
import Input from "@components/Input";
import Select from "@components/Select";
import PasswordInput from "@components/PasswordInput";

import Title from "@layout/lazuli/authentication/Title";
import Text from "@layout/lazuli/authentication/Text";

function Register() {
  const { sign_up, errors, isLoading } = useAuth();
  const router = useRouter();
  const { uuid } = router.query;

  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [nickname, updateNickname] = useState("");
  const [course, updateCourse] = useState("0");
  const [password, updatePassword] = useState("");
  const [password_confirmation, updatePasswordConfirmation] = useState("");

  const [courses, setCourses] = useState([{ id: "", name: "None" }]);

  useEffect(() => {
    getCourses().then((response) => {
      setCourses(response.data.concat(courses));
    });
  }, []);

  const onFinish = (e) => {
    e.preventDefault();
    sign_up({
      name,
      email,
      password,
      password_confirmation,
      nickname,
      uuid,
      course,
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-secondary">
      <Return componentStyle="sm:ml-14 mt-10 sm:mt-20 mb-6" />
      <div className="flex flex-col items-center justify-center sm:mt-16">
        <Title text="Sign up" />
        <Form onSubmit={onFinish}>
          <Input
            text="NAME"
            id="name"
            name="name"
            fgColor="white"
            bgColor="primary"
            onChange={(e) => updateName(e.currentTarget.value)}
          />
          <Input
            text="EMAIL"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            fgColor="white"
            bgColor="primary"
            onChange={(e) => updateEmail(e.currentTarget.value)}
          />
          <Input
            text="NICKNAME"
            id="nickname"
            name="nickname"
            fgColor="white"
            bgColor="primary"
            onChange={(e) => updateNickname(e.currentTarget.value)}
          />
          <Select
            text="COURSE"
            id="course"
            fgColor="white"
            bgColor="primary"
            defaultValue={0}
            options={courses.map((course) => ({
              key: course.id,
              name: course.name,
            }))}
            onChange={(e) => updateCourse(e.currentTarget.value)}
          />
          <PasswordInput
            text="PASSWORD"
            id="confirm"
            name="password"
            fgColor="white"
            bgColor="primary"
            onChange={(e) => updatePassword(e.currentTarget.value)}
          />
          <PasswordInput
            text="CONFIRM PASSWORD"
            id="confirm"
            name="confirm"
            fgColor="white"
            bgColor="primary"
            onChange={(e) => updatePasswordConfirmation(e.currentTarget.value)}
          />
          <Button
            type="submit"
            title={isLoading ? "Registering..." : "LET'S GO"}
            className="h-12 w-full border-quinary bg-quinary text-secondary"
          />
          {errors && (
            <p className="mt-3 font-iregular text-lg text-red-400">
              An error occured while registering.
            </p>
          )}
        </Form>
        <Text text="Already have an account?" link="Login here" href="/login" />
        <div className="absolute bottom-0 right-60 hidden lg:block">
          <Motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card img="/images/void.svg" alt="MascotFooter" inverted={false}>
              Very restricted area. You just need to fill the form.
            </Card>
          </Motion.div>
        </div>
      </div>
    </div>
  );
}

export default Register;
