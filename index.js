let audioEl = document.getElementById('music_audio')
const currentTimeEl = document.getElementById('music_current')
const durationEl = document.getElementById('music_duration')
const rangeInputEl = document.getElementById('music_progress-range')
const playMusicBtn = document.getElementById('play-btn')
const videoImageBtn = document.getElementById('video-swap-btn')
const musicImage = document.getElementById('music-img')
const musicIcon = document.getElementById('music_icon')
const musicImageCtn = document.getElementById('music_image-container')
const musicComposerEl = document.getElementById('music_composer')
const musicTitle = document.getElementById('music_title')
const playRightBtn = document.getElementById('play-right')
const playLeftBtn = document.getElementById('play-left')

let beforeInput = window.getComputedStyle(rangeInputEl, '::before')

class Song {
    constructor(composer, title, image, audio, video){
        this.composer = composer;
        this.title = title;
        this.image = image;
        this.audio = audio;
        this.video = video;
    }
}
let songsArray = []
let currentArrayCount = 0
let wastedYouth = new Song('LE SSERAFIM', 'EASY', 'unnamed (3).jpg', 'EASY.mp3', 'videoplayback.mp4')
let loSientoBB = new Song('Tainy, Bad Bunny & Julieta Venegas', 'Lo Siento BB:/', 'unnamed (1).jpg', 'bb.mp3','LoSientoBB.mp4' )
let iWon = new Song('Ty Dolla $ign, Jack Harlow& 24kGoldn', 'I Won','unnamed (2).jpg', 'Ty Dolla $ign, Jack Harlow & 24kGoldn - I Won (Official Music Video) [from F9 - The Fast Saga].mp3', 'Ty Dolla $ign, Jack Harlow & 24kGoldn - I Won (Official Music Video) [from F9 - The Fast Saga].mp4' )

// Start of push songs
const pushSongToArray = (songObject) => {
    songsArray.push(songObject)
}

pushSongToArray(wastedYouth)
pushSongToArray(loSientoBB)
pushSongToArray(iWon)
console.log(songsArray)

const setInitalAndNewSong = () => {
    audioEl = document.getElementById('music_audio')
    musicComposerEl.textContent = songsArray[currentArrayCount].composer
    musicImageCtn.innerHTML = audioEl.id == 'music_audio' ? `<img class="music-img" id="music-img" src="${songsArray[currentArrayCount].image}" alt='Song'>` : `<video class='music-img' id='music-video' src='${songsArray[currentArrayCount].video}'></video>`
    audioEl.src = audioEl.id == 'music_audio' ? `${songsArray[currentArrayCount].audio}` :  `${songsArray[currentArrayCount].video}`
    musicTitle.textContent = songsArray[currentArrayCount].title
}
document.addEventListener('DOMContentLoaded', setInitalAndNewSong)
// end of push songs
const setVideoOrImage = () => {
    audioEl.pause()
    let savedTime = audioEl.currentTime
    if(audioEl.id == 'music_audio') {
        musicIcon.classList.remove(...musicIcon.classList)
        musicIcon.classList.add('fa-solid', 'fa-music')
        musicImageCtn.innerHTML = `<video class='music-img' id='music-video' src='${songsArray[currentArrayCount].video}'></video>`
        audioEl = document.getElementById('music-video')
    } else if(audioEl.id == 'music-video'){
        musicIcon.classList.remove(...musicIcon.classList)
        musicIcon.classList.add('fa-brands', 'fa-youtube')
        musicImageCtn.innerHTML = `<img class="music-img" id="music-img" src="${songsArray[currentArrayCount].image}" alt="Jack harlow">`
        audioEl = document.getElementById('music_audio')
    }
    audioEl.onloadedmetadata = function(){
        setDurationTime()
        resetAudioListener()
    }
    audioEl.currentTime = savedTime
    audioEl.play()
    setDurationTime()
}
videoImageBtn.addEventListener('click', setVideoOrImage);

playMusicBtn.addEventListener('click', () => {
    if (audioEl.paused) {
        audioEl.play()
        playMusicBtn.innerHTML = audioEl.paused ? `<img src="Play_fill.svg" alt="Play">` : `<img src='music-pause-button-pair-of-lines-svgrepo-com (1).svg' alt='Pause' class='pause-btn' />`
    } else {
        audioEl.pause()
        playMusicBtn.innerHTML = audioEl.paused ? `<img src="Play_fill.svg" alt="Play">` : `<img src='music-pause-button-pair-of-lines-svgrepo-com (1).svg' alt='Pause' class='pause-btn' />`
    }
});
playRightBtn.addEventListener('click', () => {
    currentArrayCount++
    if(currentArrayCount >= songsArray.length) {
        currentArrayCount = 0
    }
    setInitalAndNewSong()
    audioEl.onloadedmetadata = function(){
        audioEl.play()
        playMusicBtn.innerHTML = audioEl.paused ? `<img src="Play_fill.svg" alt="Play">` : `<img src='music-pause-button-pair-of-lines-svgrepo-com (1).svg' alt='Pause' class='pause-btn' />`
    }
})
playLeftBtn.addEventListener('click', () => {
    currentArrayCount--
    if(currentArrayCount < 0) {
        currentArrayCount = songsArray.length - 1
        console.log(currentArrayCount)
    }
    setInitalAndNewSong()
    audioEl.onloadedmetadata = function(){
        audioEl.play()
        playMusicBtn.innerHTML = audioEl.paused ? `<img src="Play_fill.svg" alt="Play">` : `<img src='music-pause-button-pair-of-lines-svgrepo-com (1).svg' alt='Pause' class='pause-btn' />`
    }
})
const setInputValue = () => {
    let currentPercent = (audioEl.currentTime / audioEl.duration) * 100;
    rangeInputEl.style.setProperty('--before-width', `${currentPercent + .5}%`)
    rangeInputEl.value = currentPercent
}

rangeInputEl.addEventListener('input', () => {
    audioEl.currentTime = (rangeInputEl.value / 100) * Math.floor(audioEl.duration)
    setCurrentTime()
})

function setDurationTime() {
    let minutes = Math.floor(audioEl.duration / 60)
    let seconds = Math.floor(audioEl.duration % 60)
    let time = seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`
    durationEl.textContent = time
}

audioEl.addEventListener('loadedmetadata', setDurationTime);

function setCurrentTime(){
    let minutes = Math.floor(audioEl.currentTime / 60);
    let seconds = Math.floor(audioEl.currentTime % 60);
    currentTimeEl.textContent = seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`
    setInputValue()
    if(audioEl.duration <= audioEl.currentTime){
        currentArrayCount++
        setInitalAndNewSong()
        audioEl.onloadedmetadata = function(){
            audioEl.play()
            playMusicBtn.innerHTML = audioEl.paused ? `<img src="Play_fill.svg" alt="Play">` : `<img src='music-pause-button-pair-of-lines-svgrepo-com (1).svg' alt='Pause' class='pause-btn' />`
        }
    }
}
function resetAudioListener() {
    audioEl.addEventListener('timeupdate', setCurrentTime)
}
resetAudioListener()

