import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useExternalScript from "../components/UseExternalScript";
//import useScript from "../components/UseScript";
import styles from "./RoomJoin.module.css";
//import React from "react";
//import { Helmet } from "react-helmet";
//import useScript from 'react-script-hook';

function RoomJoinPage() {
  const params = useParams();
  const ROOM_ID = params.roomId;

  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.text = `const ROOM_ID = "${params.roomId}"`;
    script.type = "text/javascript";
    head.appendChild(script);
    return () => {
      head.removeChild(script);
    };
  }, []);

  useExternalScript("/script.js");

  //const videoGrid = document.getElementById('video-grid')
  //console.log("videoGrid" + videoGrid.innerHTML)

  //const socket = io('http://localhost:8000/')
  //const myPeer = new Peer();



  //useExternalScript("https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js");
  //useExternalScript("http://localhost:8000/socket.io/socket.io.js");
  //useExternalScript("/script.js");




  // const ROOM_ID = params.roomId;
  //const statusPeer = useScript(`https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js`)
  //const statusSocket = useScript(`http://localhost:8000/socket.io/socket.io.js`)
  //const statusScript = useScript(`/script.js`)

  /*
  useScript({
    src: 'https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js',
    onload: () => console.log('Script Peer loaded!'),
  });

  useScript({
    src: 'http://localhost:8000/socket.io/socket.io.js',
    onload: () => console.log('Script Socket loaded!'),
  });
  */

  /*
  useScript({
    src: '/script.js',
    onload: () => console.log('Script script loaded!'),
  });
  */

  /*
  {statusPeer && statusSocket && <script src="/script.js" async defer/>}
      <p>StatusPeer: {statusPeer}</p>
      <p>statusSocket: {statusSocket}</p>
  */

  /*
    <Helmet>
      <script type="text/javascript">
        const ROOM_ID = {params.roomId};
        console.log(ROOM_ID);
      </script>
      <script src="https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js" strategy="beforeInteractive"></script>
      <script src="http://localhost:8000/socket.io/socket.io.js" strategy="beforeInteractive"></script>
      <script defer src="http://localhost:8000/script.js" strategy="afterInteractive"></script>
    </Helmet>
  */

    //{ statusPeer && statusSocket && <script defer src="http://localhost:8000/script.js" strategy="afterInteractive"></script>}

    /*
    <p>StatusPeer: {statusPeer}</p>
      <p>statusSocket: {statusSocket}</p>
      <p>statusScript: {statusScript}</p>
    */

  /*
  <script type="text/javascript">
        const ROOM_ID = {params.roomId};
        console.log(ROOM_ID);
      </script>
  */

  return (
    <>
      <h1>Room Id</h1>
      <p>{params.roomId}</p>
      <div id="video-grid" className={styles.videoGrid}>
        <video></video>
        <video></video>
        <video></video>
      </div>
    </>
  );
}

export default RoomJoinPage;
