import axios from "axios";

function Home() {
  const createPlayer = () => {
    axios
      .post("/addplayer", {
        userReq: JSON.parse(localStorage.getItem("user")),
        name: "test",
        aventure: "test",
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <h1>HOME</h1>
      <button onClick={createPlayer}>test</button>
    </div>
  );
}

export default Home;
