import { useState } from "react";

function Participant({ name, selected, onClick, last }) {
  return (
    <div
      className={`h-16 w-full ${selected ? "bg-quinary" : ""} ${
        last ? "" : "border-b-2 border-slate-400"
      }`}
    >
      <button
        onClick={onClick}
        className="tems-center font-md h-full w-full py-2 px-2 text-left font-iregular text-white"
      >
        {name}
      </button>
    </div>
  );
}

export default function ParticipantSelector({
  participants,
  onParticipantChange,
}) {
  var defaultState = [];
  for (var i = 0; i < participants.length; i++) defaultState.push(false);

  const [st, updateState] = useState(defaultState);
  const changeParticipant = (n) => {
    //Making a deep copy of the state array so that when it is updated
    //the component rerenders. If we do a shallow copy, React will not
    //see a change as a state change as the reference didn't change
    var temp = JSON.parse(JSON.stringify(st));
    temp[n] = !temp[n];
    onParticipantChange(temp);
    updateState(temp);
  };

  return (
    <div>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            <Participant
              name={participant}
              selected={st[index]}
              last={index == participants.length - 1}
              onClick={(e) => changeParticipant(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
