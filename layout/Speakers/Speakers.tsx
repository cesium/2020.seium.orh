import { useRouter } from "next/router";
import { withoutAuth } from "@context/Auth";

import { Hero, Schedule } from "./components";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

function Speakers() {
  const router = useRouter();

  return (
    <Navbar bgColor="secondary" button="quinary" fgColor="white">
      <Hero />
      <Schedule detailed={false} filters={router.query.speaker} />
      <Footer color="secondary" />
    </Navbar>
  );
}

export default withoutAuth(Speakers);
