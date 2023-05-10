import { FC } from "react";
import "./YouTubeForm.css";

export const YouTubeForm: FC = () => {
  return (
    <form className="YoutubeForm">
      <label>
        <p>Username</p>
        <input type="text" id="username" name="username" />
      </label>

      <label>
        <p>Email</p>
        <input type="email" id="email" name="email" />
      </label>

      <label>
        <p>Channel</p>
        <input type="text" id="channel" name="channel" />
      </label>

      <button>Submit</button>
    </form>
  );
};
