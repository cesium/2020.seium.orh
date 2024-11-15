import { useEffect, useState } from "react";

import { motion as Motion } from "framer-motion";

import Card from "@components/Card";
import Return from "@components/Return";
import { SignUpForm } from "./components";
import Title from "@layout/lazuli/authentication/Title";
import Text from "@layout/lazuli/authentication/Text";

import { getCourses } from "@lib/api";

interface Course {
  id: any;
  name: string;
}

function Signup() {
  const [courses, setCourses] = useState<Course[]>([{ id: "", name: "None" }]);

  useEffect(() => {
    getCourses().then((response) => {
      setCourses(response.data.concat(courses));
    });
  }, []);

  return (
    <div className="min-h-screen select-none overflow-hidden bg-secondary">
      <Return componentStyle="sm:ml-14 mt-10 sm:mt-20 mb-6" />
      <div className="mb-4 flex flex-col items-center justify-center sm:mt-16">
        <Title text="Sign up" />
        <SignUpForm courses={courses} />
        <Text text="Already have an account?" link="Login here" href="/login" />
      </div>
    </div>
  );
}

export default Signup;
