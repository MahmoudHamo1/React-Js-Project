import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { User } from "../../Website/Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const id = window.location.pathname.split("/").slice(-1)[0];
  const [accept, setAccept] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setTitle(data.data[0].title);
        setDescription(data.data[0].description);
      })
      .catch((err) => console.log(err));
  }, []);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", Description);
      formData.append("image", image);
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,

        formData,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/products");
    } catch (err) {
      console.log(err);
      setAccept(true);
    }
  }
  return (
    <div>
      <form onSubmit={Submit}>
        <label htmlFor="name">title : </label>
        <input
          id="name"
          type="text"
          placeholder="title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {title < 1 && accept && (
          <p className="error">title must be more than 2 char</p>
        )}
        <label htmlFor="email"> Description : </label>
        <input
          id="email"
          type="text"
          placeholder="Description..."
          required
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* {accept && emailError === 422 && (
          <p className="error">Email is already been taken</p>
        )} */}
        <label htmlFor="password"> image : </label>
        <input
          id="password"
          type="file"
          placeholder="image..."
          onChange={(e) => setImage(e.target.files.item(0))}
        />
        {/* {password.length < 8 && accept && (
          <p className="error">password must be more than 8 Char</p>
        )} */}

        <div style={{ textAlign: "center" }}>
          <button type="submit" className="btn">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
