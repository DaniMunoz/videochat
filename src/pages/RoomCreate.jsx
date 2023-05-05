import { useNavigate } from "react-router-dom";
import styles from "./RoomJoin.module.css";

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
      <h1>VideoCat</h1>
      <img src="/videocat-200.png" className={styles.logo} />
      <h2>&nbsp;</h2>
      <p>
        <button onClick={navigateHandler}>Create VideoChat</button>
      </p>
    </>
  );
}

export default RoomCreatePage;
