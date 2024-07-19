import { useState, useEffect, useContext } from "react";
import { User } from "../../Website/Context/UserContext";

import Forms from "../../../Components/Forms/Form";
export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const context = useContext(User);
  const token = context.auth.token;

  const id = window.location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);

  return (
    <>
      <h1>Update Users</h1>
      <div className="parent">
        <Forms
          button="Update"
          name={name}
          email={email}
          endPoint={`user/update/${id}`}
          navigate="dashboard/users"
          haslocalStorage={false}
        />
      </div>
    </>
  );
}
