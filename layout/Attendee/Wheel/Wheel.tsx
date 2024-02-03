import { useState, useEffect, ReactNode } from "react";
import { withAuth, useAuth, IAttendee } from "@context/Auth";

import Heading from "@components/Heading";
import Button from "@components/Button";
import Layout from "@components/Layout";

import {
  WheelComponent,
  WheelMessage,
} from "./components";

import ErrorMessage from "@components/ErrorMessage";

import {
  getWheelPrizes,
  getWheelPrice,
  getWheelLatestWins,
  spinWheel,
} from "@lib/api";
import Table, { Align, TableColumn } from "@components/Table";
import AttendeeMention from "@components/AttendeeMention";

interface IPrize {
  avatar: string;
  id: number;
  max_amount_per_attendee: number;
  name: string;
  stock: number;
}

interface IWin {
  attendee_name: string;
  attendee_nickname: string;
  date: string;
  prize: IPrize;
}

/*
Gets how long ago the given date/time was in a user friendly way (10 seconds ago, 1 minute ago, etc)
*/
function displayTimeSince(dateString) {
  const date = Date.parse(dateString);
  const now = new Date();

  const differenceMiliSeconds = now.getMilliseconds() - date;

  let value;
  let string;

  if (differenceMiliSeconds <= 60 * 1000) {
    value = Math.round(differenceMiliSeconds / 1000);
    string = `${value} seconds ago`;
  } else if (differenceMiliSeconds <= 60 * 60 * 1000) {
    value = Math.round(differenceMiliSeconds / (60 * 1000));
    string = `${value} minutes ago`;
  } else if (differenceMiliSeconds <= 24 * 60 * 60 * 1000) {
    value = Math.round(differenceMiliSeconds / (60 * 60 * 1000));
    string = `${value} hours ago`;
  } else {
    value = Math.round(differenceMiliSeconds / (24 * 60 * 60 * 1000));
    string = `${value} days ago`;
  }
  return value < 0 ? "Now" : string;
}

function displayQuantity(qt) {
  return qt > 1000 ? "∞" : qt;
}

function WheelPage() {
  const defaultState = {
    angle: 0,
    speed: 0,
  };
  const angleSpeed = 20;
  const [st, updateState] = useState(defaultState);

  const { user, refetchUser } = useAuth() as {
    user: IAttendee;
    refetchUser: () => void;
  };

  const [prizes, updatePrizes] = useState<IPrize[]>([]);
  const [price, updatePrice] = useState<number>(null);
  const [latestWins, updateLatestWins] = useState<IWin[]>([]);
  const [error, updateError] = useState<boolean>(false);
  const [wheelMessage, updateWheelMessage] = useState<ReactNode>(<></>);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const requestAllInfo = () => {
    getWheelPrizes()
      .then((response) => updatePrizes(response.data))
      .catch((_) => updateError(true));

    getWheelPrice()
      .then((response) => updatePrice(response.price))
      .catch((_) => updateError(true));

    getWheelLatestWins()
      .then((response) => updateLatestWins(response.data))
      .catch((_) => updateError(true));
  };
  useEffect(requestAllInfo, []);

  const canSpin = () => {
    return user.token_balance >= price && !isSpinning;
  };

  const spinTheWheel = () => {
    setIsSpinning(true);
    updateState({ angle: 0, speed: angleSpeed });
    user.token_balance -= price;
    setTimeout(() => {
      spinWheel()
        .then((response) => {
          if (response.tokens) {
            updateWheelMessage(
              <WheelMessage
                title="You won tokens!"
                description={`Congratulations! You won ${response.tokens} tokens!`}
                onExit={(_) => updateWheelMessage(null)}
              />
            );
          } else if (response.badge) {
            updateWheelMessage(
              <WheelMessage
                title="You won a badge!"
                description={`Congratulations! You won the ${response.badge.name} badge. Go check it out in the badgedex tab.`}
                onExit={(_) => updateWheelMessage(null)}
              />
            );
          } else if (response.entries) {
            updateWheelMessage(
              <WheelMessage
                title="You won entries to the final draw!"
                description={`Congratulations! You won ${response.entries} entries for the final draw!`}
                onExit={(_) => updateWheelMessage(null)}
              />
            );
          } else if (response.prize.name == "Nada") {
            updateWheelMessage(
              <WheelMessage
                title="You didn't win anything!"
                description="Better luck next time."
                onExit={(_) => updateWheelMessage(null)}
              />
            );
          } else {
            updateWheelMessage(
              <WheelMessage
                title={`You won a ${response.prize.name}!`}
                description={`Congratulations! You won a ${response.prize.name}!`}
                onExit={(_) => updateWheelMessage(null)}
              />
            );
          }
        })
        .catch((_) => {
          updateWheelMessage(
            <WheelMessage
              title="You don't have tokens!"
              description="You do not have enough tokens to spin the wheel."
              onExit={(_) => updateWheelMessage(null)}
            />
          );
        })
        .finally(() => {
          requestAllInfo();
          refetchUser();
          setIsSpinning(false);
        });
    }, 5000);
  };

  const changeState = () => {
    updateState({
      angle: (st.angle + st.speed) % 360,
      speed: st.speed - 0.1,
    });
  };

  //Rotate at 60fps
  useEffect(() => {
    if (st.speed > 0) setTimeout(changeState, 1000 / 60);
  }, [st]);

  return (
    <Layout title="Wheel" description="Spin the wheel and win awards!">
      <div className="mt-12 grid-cols-1 overflow-hidden text-white 2xl:grid-cols-2">
        <div className="col-span-1 float-left h-full w-full 2xl:w-1/2">
          <Heading text="Achievements">
            <div className="h-full w-40 pt-1">
              <div className="col-span-1 float-left w-full">
                💰{user.token_balance} Tokens
              </div>
            </div>
            <div className="h-full w-40 pt-1">
              <div className="col-span-1 float-left w-full">
                🏅{user.badge_count} Badges
              </div>
            </div>
          </Heading>
          <div className="mb-10 pt-5">
            <div className="m-auto h-72 w-72 xs:h-80 xs:w-80 sm:h-96 sm:w-96">
              <WheelComponent steps={16} angle={st.angle} />
            </div>
            {price != null && (
              <Button
                className={`${
                  canSpin()
                    ? "cursor-pointer bg-quinary"
                    : "bg-gray-400 opacity-50"
                } mt-10 block h-20 w-64`}
                disabled={!canSpin()}
                onClick={spinTheWheel}
                title="SPIN THE WHEEL"
                description={`${price} tokens💰`}
                bold={true}
              />
            )}
          </div>
        </div>
        <div className="col-span-1 float-right w-full 2xl:w-1/2 2xl:pl-6">
          <div>
            <Heading text="Latest Wins"></Heading>
            <Table elems={latestWins}>
              <TableColumn<IWin> elemAlign={Align.Left} getter={(w) => <AttendeeMention attendee={{name: w.attendee_name, nickname: w.attendee_nickname}}/> } />
              <TableColumn<IWin> elemAlign={Align.Right} getter={(w) => <img src={w.prize.avatar} className="h-8" /> } />
              <TableColumn<IWin> elemAlign={Align.Left} colSpan={2} getter={(w) => <p className="ml-4">{w.prize.name}</p>} />
              <TableColumn<IWin> elemAlign={Align.Right} elemPadding={4} getter={(w) => <p className="text-ibold font-bold text-quinary">{displayTimeSince(w.date)}</p> } />
            </Table>
          </div>

          <div className="mt-10">
            <Heading text="Awards"></Heading>
            <Table elems={prizes}>
              <TableColumn<IPrize> header="Image" getter={(p) => <img src={p.avatar} className="h-8" /> } />
              <TableColumn<IPrize> header="Name" colSpan={3} headerAlign={Align.Left} elemAlign={Align.Left} getter={(p) => p.name } />
              <TableColumn<IPrize> header="Qt/pax" getter={(p) => displayQuantity(p.max_amount_per_attendee) } />
              <TableColumn<IPrize> header="Qt" getter={(p) => displayQuantity(p.stock) } />
            </Table>
          </div>
        </div>
      </div>
      {error && <ErrorMessage />}
      {wheelMessage}
    </Layout>
  );
}

export default withAuth(WheelPage);
