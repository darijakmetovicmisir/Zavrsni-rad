import React from "react";
import { useSelector } from "react-redux";

export function Members() {
  const dudes = useSelector((state) => state.chat.dudes);

  return (
    <ul className="people">
      {dudes.map((dudes, idx) => {
        return (
          <li
            key={idx}
            value={dudes}
            className={`person ${idx === 0 ? "focus" : ""}`}
          >
            <span className="title">{dudes.clientData.username}</span>
            <br />
          </li>
        );
      })}
    </ul>
  );
}
