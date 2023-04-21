import { Button } from "@mui/material";

export default function Lobby() {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("adventureId");

  const players = [
    {
      name: "jean michel",
      class: "barbare",
      stats: [
        {
          name: "hp",
          value: 100,
          max: 100,
        },
        {
          name: "strengh",
          value: 70,
          max: 100,
        },
        {
          name: "dexterity",
          value: 70,
          max: 100,
        },
        {
          name: "intel",
          value: 70,
          max: 100,
        },
      ],
    },
    {
      name: "jean michel",
      class: "barbare",
      stats: [
        {
          name: "hp",
          value: 100,
          max: 100,
        },
        {
          name: "strengh",
          value: 70,
          max: 100,
        },
        {
          name: "dexterity",
          value: 70,
          max: 100,
        },
        {
          name: "intel",
          value: 70,
          max: 100,
        },
      ],
    },
    {
      name: "jean michel",
      class: "barbare",
      stats: [
        {
          name: "hp",
          value: 100,
          max: 100,
        },
        {
          name: "strengh",
          value: 70,
          max: 100,
        },
        {
          name: "dexterity",
          value: 70,
          max: 100,
        },
        {
          name: "intel",
          value: 70,
          max: 100,
        },
      ],
    },
  ];

  const playersList = players.map((player) => {
    return (
      <>
        <div className="col-6 mt-2 d-flex justify-content-center">
          <div className="col-11 card">
            <div className="mx-1 d-flex justify-content-around">
              <span>{player.name}</span>
              <span>{player.class}</span>
            </div>
            <div className="row">
              {player.stats.map((stat) => {
                return (
                  <>
                    <span key={stat.name} className="col-5 m-1">
                      {stat.name} : {stat.value}/{stat.max}
                    </span>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  });
  return (
    <div className="container">
      <div className="row card  mt-3">
        <div className="col d-flex justify-content-between align-items-center">
          <Button>leave</Button>
          <span>name</span>
          <Button>create</Button>
        </div>
      </div>
      <div className="row card mt-3 d-flex flex-column align-items-center">
        <span className="w-25 text-center m-1">Description</span>
        <div className="col">
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            possimus error sint! Placeat sequi perspiciatis inventore saepe
            aspernatur mollitia, minus dignissimos porro, provident doloremque
            ipsa impedit expedita pariatur nisi voluptatibus explicabo autem ex
            facere, quidem officia? Repellat velit, minima totam iste accusamus
            fugit tempora culpa deserunt veritatis sit perspiciatis
            reprehenderit distinctio vero accusantium at quidem nihil rem dicta
            eveniet? Beatae itaque distinctio eum! Rerum explicabo nemo
            voluptate sequi, neque ea! Quod, hic atque, vero quidem, molestias
            dignissimos odio nemo assumenda magnam quibusdam deserunt blanditiis
            perspiciatis consequatur ipsam ratione animi nihil dolore!
            Cupiditate possimus iste culpa maiores. Labore architecto quos
            totam.
          </span>
        </div>
      </div>
      <div className="row mt-3 d-flex justify-content-between">
        <div className="col-9 card h-50 p-2">
          <div className="row d-flex justify-content-between p-2">
            {playersList}
          </div>
        </div>
        <div className="col-3 h-50 d-flex justify-content-end p-0">
          <div className="col-11 card">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            ratione itaque eum mollitia deleniti iusto dolorum error incidunt
            maiores commodi totam possimus deserunt distinctio vitae assumenda,
            minima dicta quos. Nesciunt.
          </div>
        </div>
      </div>
    </div>
  );
}
