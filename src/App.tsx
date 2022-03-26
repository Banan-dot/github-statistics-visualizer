import React, { useState } from "react";
import UserInfo from "./UserInfo/UserInfo";

export default function App(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      {!isSubmitted && (
        <form onSubmit={onSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (isSubmitted) setIsSubmitted(false);
              }}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      )}
      {isSubmitted && <UserInfo username={username} />}
    </div>
  );
}
