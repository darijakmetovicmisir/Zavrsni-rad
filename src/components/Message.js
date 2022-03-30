import React from "react";
import drone from "../utils/Drone";
import moment from "moment";

// incoming, outgoing

export function Message({ value }) {
  if (!value) return "";

  let direction =
    drone.channel.clientId === value.member.id ? "outgoing" : "incoming";

  let time = (timestamp) => {
    let tsp = moment.unix(timestamp);
    return tsp.format("DD-MM HH-mm");
  };
  return (
    <div className={direction}>
      <div
        className="bubble"
        style={{ backgroundColor: value?.member.clientData.color }}
      >
        <div>{value.member.clientData.username}:</div>
        {value.text}
        <div>{time(value.timestamp)}</div>
      </div>
    </div>
  );
}
