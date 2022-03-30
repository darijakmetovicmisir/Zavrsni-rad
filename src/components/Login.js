import React from "react";
import "./Login.scss";
import { login, setMember } from "../utils/ChatSlice";
import { useDispatch, useSelector } from "react-redux";

export function Login() {
  const dispatch = useDispatch();
  const logMeIn = () => dispatch(login(true));
  const me = useSelector((state) => state.chat.member);

  return (
    <div className="align">
      <div className="grid align__item">
        <div className="register">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="site__logo"
            width="56"
            height="84"
            viewBox="77.7 214.9 274.7 412"
          />

          <h2>Welcome to my Chat app</h2>
          <form className="form">
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Enter username"
              onChange={(e) =>
                dispatch(setMember({ ...me, username: e.target.value }))
              }
            />
            <br />
            <br />

            <button onClick={logMeIn}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
