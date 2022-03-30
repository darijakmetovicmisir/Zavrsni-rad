import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Message } from "../components/Message";
import { Members } from "../components/Members";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import drone from "./Drone";
import { login } from "./ChatSlice";
import "./Chat.scss";

export function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const me = useSelector((state) => state.chat.member);
  const [payload, setPayload] = useState("");

  const sendMessage = () => drone.send(payload) && setPayload("");

  if (me && me.color) {
    document.body.style.background = `linear-gradient(to bottom left ${me.color} 40%, ${me.color} 22 100%)`;
  }

  const logMeOut = () => dispatch(login(false));
  return (
    <>
      <div className="container">
        <button className="logout" onClick={logMeOut}>
          Logout
        </button>
        <div className="chatbox">
          <div className="top-bar">
            <div className="avatar"></div>
            <div className="name">public channel</div>
          </div>
          <div className="middle">
            <div className="timeline">
              {messages.map((message, index) => (
                <Message key={index} value={message} type={"outgoing"} />
              ))}
              <div className="typing">
                <div className="bubble">
                  <div className="ellipsis one"></div>
                  <div className="ellipsis two"></div>
                  <div className="ellipsis three"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-bar">
            <div className="chat">
              <input
                type="text"
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                onChange={(e) => setPayload(e.target.value)}
                value={payload}
              />
              <span className="button" onClick={sendMessage}>
                <FontAwesomeIcon className="submit fas" icon={faPaperPlane} />{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="list"></div>
        <div className="profile">
          <div className="avatar">
            <p>{me?.username?.[0].toUpperCase()}</p>
          </div>
          <div className="name2">{me?.username}</div>
        </div>
        <Members />
      </div>
    </>
  );
}
