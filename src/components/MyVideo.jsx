import { createElement } from 'react';

function MyVideo({src}){

    
    const video = createElement('video', {className: 'video'}, createElement('source', {src: src}, null));
    //video.key = key;
    //video.source.src = src;
    /*
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });
    */
    

    /*
    const video = document.createElement('video');
    video.srcObject = src;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    });
    */

    return video;

    /*
    return (
        <video width="320" height="240">
            <source src={src}/>
        </video>
    );
    */
}

export default MyVideo;