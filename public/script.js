//const socket = io('/')
const socket = io('http://localhost:8000/')
//const socket = io('https://webrtc-video-server-production.up.railway.app')
const videoGrid = document.getElementById('video-grid')
/*
//Para conectar en local o a un servidor propio
const myPeer = new Peer(undefined, {
    host: '/',
    port: '8000'
})
*/

//Conecta al cloud server de PeerJS
const myPeer = new Peer();

const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
//var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

navigator.mediaDevices.getUserMedia({
    //video: true,
    video: {
        facingMode: 'user',
        height: {ideal:1920},
        width: {ideal: 1920},
    },
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    })
})



myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

socket.on('user-connected', userId => {
    console.log('User connected: ' + userId)
})

socket.on('user-disconnected', userId => {
    if(peers[userId]) peers[userId].close()
})

function connectToNewUser(userId, stream){
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    //video.class = 'myvideo'
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream(video, stream){
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}