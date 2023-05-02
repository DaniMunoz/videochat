import { useNavigate } from "react-router-dom";

function RoomCreatePage() {
  const navigate = useNavigate();

  function navigateHandler() {
    //fetch("http://localhost:8000/room")
    fetch("https://webrtc-video-server-production.up.railway.app/room")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.room);
        navigate(`/room/room-join/${data.room}`);
      });
  }

  return (
    <>
      <h1>My Zoom</h1>
      <p></p>
      <p>Create a meeting room</p>
      <p>Copy the link and send it to your contacts for them to join</p>
      <p>
        <button onClick={navigateHandler}>Create meeting room</button>
      </p>
    </>
  );
}

export default RoomCreatePage;
