import React from "react";
import { withAuth } from "@context/Auth";

import Heading from "@components/Heading";
import Layout from "@components/Layout";

import SponsorPrizeButton from "@layout/lazuli/sponsor/dashboard/SponsorPrizeButton";
import SponsorBadgeButton from "@layout/lazuli/sponsor/dashboard/SponsorBadgeButton";
import ParticipantSelector from "@layout/lazuli/sponsor/dashboard/ParticipantSelector";

const SponsorDashboard: React.FC = () => {
  const participants: string[] = ["Nome 1", "Nome 2", "Nome 3", "Nome 4"];

  const onParticipantChange = (p: string) => {};

  return (
    <Layout
      title="Dashboard"
      description="Neste local, pode dar badges ao participantes que se encontram no seu stand"
    >
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2">
        <div className="mr-3 w-full">
          <Heading text="Participantes no stand" />
          <div className="mt-8 w-auto text-white">
            <button className="bg-aqua m-auto block h-10 w-32 rounded-full border-2 hover:bg-white hover:text-black">
              <p className="font-iregular">Refresh</p>
            </button>
          </div>
          <ParticipantSelector
            participants={participants}
            onParticipantChange={onParticipantChange}
          />
        </div>

        <div className="ml-3 w-full text-white">
          <Heading text="Comandos" />

          <div className="m-auto w-3/4">
            <div className="mt-5">
              <SponsorBadgeButton sponsor="Subvisual" all={false} />
              <SponsorPrizeButton prize="Câmara ligada" />
              <SponsorPrizeButton prize="Conversa Interessante" />
              <SponsorPrizeButton prize="Participante Excecional" />
            </div>

            <div className="mt-24">
              <SponsorBadgeButton sponsor="Subvisual" all={true} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(SponsorDashboard);
