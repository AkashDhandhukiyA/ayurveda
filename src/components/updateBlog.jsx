import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { id } = useParams();
  const [preview, setPreview] = useState("");
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState("");
  const [From, setFrom] = useState({
    name: "",
    blogcontain: "",
    description: "",
    image: null,
  });
  useEffect(() => {
    fetch(`http://localhost:3001/admin/Blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const B = data.blog;
        setFrom({
          name: B.name,
          blogcontain: B.blogcontain,
          description: B.description,
          image: null,
        });
        setPreview(`http://localhost:3001/uploads/${B.image}`);
      });
  }, [id]);
  //handlechange
  const handlechange = async (e) => {
    setFrom({ ...From, [e.target.name]: e.target.value });
  };
  //Image
  const HandleImage = async (e) => {
    const file = e.target.files[0];
    setFrom({ ...From, image: file });
    setPreview(URL.createObjectURL(file));
  };
  //submit
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", From.name);
    fd.append("blogcontain", From.blogcontain);
    fd.append("description", From.description);

    if (From.image) {
      fd.append("image", From.image);
    }
    const res = await fetch(`http://localhost:3001/admin/updateblog/${id}`, {
      method: "PUT",
      body: fd,
    });
    const result = await res.json();
    if (result.success) {
      setmessage(result.message);
      setstatus("true");
    } else {
      setmessage("something wrong");
      setstatus("false");
    }
  };
  return (
    <>
      {message && <div className={`MESSAGE-BOX ${status}`}>{message}</div>}
      <form onSubmit={HandleSubmit}>
        NAME:{" "}
        <input
          type="text"
          name="name"
          id="name"
          value={From.name}
          onChange={handlechange}
        />
        BlogContain:
        <input
          type="text"
          name="blogcontain"
          id="blogcontain"
          value={From.blogcontain}
          onChange={handlechange}
        />
        Description:
        <input
          type="text"
          name="description"
          id="description"
          value={From.description}
          onChange={handlechange}
        />
        Image:
        <input type="file" name="image" id="image" onChange={HandleImage} />
        {preview && <img src={preview} alt="preview" width="140px" />}
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
export default UpdateBlog;
