import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
import styles from "./RoomJoin.module.css";
import useWindowSize from "../components/UseWindowSize";

export default function RoomJoinPage() {
  const params = useParams();
  const videoGridRef = useRef(null);
  const [videosNumber, setVideosNumber] = useState(0);
  let myStream = useRef(null);

  useEffect(() => {
    const ROOM_ID = params.roomId;
    //const socket = io("http://localhost:8000/");
    const socket = io("https://webrtc-video-server-production.up.railway.app");

    /*
    //Para conectar en local o a un servidor propio
      const myPeer = new Peer(undefined, {
      host: '/',
      port: '8000'
    })
    */
    //Conecta al cloud server de PeerJS
    const myPeer = new Peer();

    const myVideo = document.createElement("video");
    myVideo.muted = true;
    const peers = {};
    //var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    navigator.mediaDevices
      .getUserMedia({
        //video: true,
        video: {
          facingMode: "user",
          //height: { ideal: 320 },
          //width: { ideal: 240 },
        },
        audio: true,
      })
      .then((stream) => {
        myStream.current = stream;
        addVideoStream(myVideo, myStream.current);
      });

    //////////////////////////////////////
    myPeer.on("call", async (call) => {
      if(myStream.current === null){
        myStream.current = await navigator.mediaDevices.getUserMedia(
          {
              audio: true,
              video: {
                facingMode: "user",
                //height: { ideal: 320 },
                //width: { ideal: 240 },
              },
          });
      }
      call.answer(myStream.current);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        console.log("call.on.stream 1");
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      console.log("User connected 1: " + userId);
      connectToNewUser(userId, myStream.current);
    });

    myPeer.on("open", (id) => {
      socket.emit("join-room", ROOM_ID, id);
    });

    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) peers[userId].close();
    });

    function connectToNewUser(userId, stream) {
      const video = document.createElement("video");
      const call = myPeer.call(userId, stream);
      call.on("stream", (userVideoStream) => {
        //console.log("call.on.stream");
        addVideoStream(video, userVideoStream);
      });
      call.on("close", () => {
        //console.log("call.on.close");
        video.remove();
        setVideosNumber(() => document.getElementsByTagName("video").length);
      });
      peers[userId] = call;
    }

    function addVideoStream(video, stream) {
      console.log("addVideoStream");
      video.srcObject = stream;
      video.className = styles.video;
      video.addEventListener("loadedmetadata", () => {
        console.log("loadedmetadata");
        video.play();
      });
      videoGridRef.current.appendChild(video);
      setVideosNumber(() => document.getElementsByTagName("video").length);
    }

    //cleanup useEffect
    return () => {
      socket.disconnect();
      socket.close();
      myPeer.destroy();
      myVideo.remove();
    };
  }, [params.roomId]);

  /* Video resizing  */

  const windowSize = useWindowSize();

  useEffect(() => {
    function resizeVideos() {
      let width = screen.width;
      let height = screen.height;
      let videoWidth = screen.width;
      let videoHeight = screen.height;
      if (windowSize.width !== undefined) {
        width =
          windowSize.width < screen.width ? windowSize.width : screen.width;
      }
      if (windowSize.height !== undefined) {
        height =
          windowSize.height < screen.height ? windowSize.height : screen.height;
      }
      width -= 20; //some room form margins
      height -= 120; //header text and link get some height, so there is less height for videos
      videoWidth = width;
      videoHeight = height;
      //console.log("windowSize.width: " + windowSize.width + " windowSize.height: " + windowSize.height);
      //console.log("screen.width: " + screen.width + " screen.height: " + screen.height);
      //console.log("videosNumber: " + videosNumber);
      let rows = 1;
      let columns = 1;
      while (rows * columns < videosNumber) {
        if (videoWidth > videoHeight) {
          columns += 1;
          videoWidth = Math.round(width / columns);
        } else {
          rows += 1;
          videoHeight = Math.round(height / rows);
        }
      }
      //console.log("columns: " + columns + " rows: " + rows);
      //console.log("width: " + videoWidth + " height: " + videoHeight);
      document.documentElement.style.setProperty(
        "--video-width",
        `${videoWidth - columns}px`
      );
      document.documentElement.style.setProperty(
        "--video-height",
        `${videoHeight - rows}px`
      );
    }
    resizeVideos();
  }, [windowSize, videosNumber]);

  return (
    <>
      <img src="/videocat-100.png" className={styles.logo_left} />
      <p>Send this link to your contacts for them to join</p>
      <p className={styles.enlace}>
        https://charla.vercel.app/room/room-join/{params.roomId}{" "}
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `https://charla.vercel.app/room/room-join/${params.roomId}`
            );
          }}
        >
          Copy
        </button>
      </p>
      <div ref={videoGridRef} id="videogrid" className={styles.videoGrid}></div>
    </>
  );
}
