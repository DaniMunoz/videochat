import MyVideo from "./MyVideo";
import styles from "./VideoGrid.module.css";

function VideoGrid(props) {

  //const { videos } = props;
  const videos = props;
    /*
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    */

    //<MyVideo key={video.id} src={video.stream}/>
    return (
        <div id="videogrid" className={styles.videoGrid} width="1000px" height="1000px">
          {Array.isArray(videos) && videos.map((video) => (
            <MyVideo key={video.id} src={video.stream}/>
          ))}
        </div>
      );
}

export default VideoGrid;