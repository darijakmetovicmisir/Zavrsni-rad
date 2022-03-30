import React, { useEffect } from "react";
import drone from "./utils/Drone";
import { Chat } from "./utils/Chat";
import { Login } from "./components/Login";
import {
  setMember,
  setMessage,
  intDudes,
  setDude,
  removeDude,
} from "./utils/ChatSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.chat.member);
  const auth = useSelector((state) => state.chat.authenticated);

  useEffect(() => {
    if (!auth) return;
    // connect to drone API
    let channel = drone.init(me);

    channel.on("open", (error) =>
      drone.open(error, () =>
        dispatch(setMember({ ...me, id: channel.clientId }))
      )
    );
    // select default room
    drone.subscribe((message) => {
      const { data, timestamp, member } = message;
      dispatch(setMessage({ member, text: data, timestamp }));
    });
    // members
    drone.room.on("members", function (members) {
      dispatch(intDudes(members));
    });
    drone.room.on("member_join", function (member) {
      dispatch(setDude(member));
    });
    drone.room.on("member_leave", function (member) {
      // Member object
      dispatch(removeDude(member));
    });
  }, [auth]);
  return <div className="App">{auth ? <Chat /> : <Login />}</div>;
}

export default App;
