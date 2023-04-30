//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RoomCreatePage() {
  const navigate = useNavigate();

  function navigateHandler() {
    //fetch("http://localhost:8000/room")
    fetch("https://webrtc-video-server-production.up.railway.app/room")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.room);
        //window.location.replace("/room-join?roomId=" + data.room);
        //navigate(`/room-join/${data.room}`);
        navigate(`/room/room-join/${data.room}`);
      });
  }

  /*
  useEffect(() => {
    fetch("http://localhost:8000/room")
      //fetch("https://webrtc-video-server-production.up.railway.app/room")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.room);
        //window.location.replace("/room-join?roomId=" + data.room);
        navigate(`/room-join/${data.room}`);
      });
  }, [navigate]);
  */

  /* <Link to={`./room.html?roomId=${room}`}> Enter Room </Link> */
  //TODO: Redirect a http://localhost:3000/room.html?roomId={room}
  return (
    <>
      <h1>My Zoom</h1>
      <p></p>
      <ul>
        <li>Create a meeting room</li>
        <li>Copy the link and send it to your contacts for them to join</li>
      </ul>
      <p>
        <button onClick={navigateHandler}>Create meeting room</button>
      </p>
    </>
  );
}

export default RoomCreatePage;
