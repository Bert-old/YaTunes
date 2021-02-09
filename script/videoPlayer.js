import { addZero } from './supScript.js';
import { maxVolume, muteVolume, changeValue, valueToVolume, } from './volumeController.js';

export function videoPlayerInit() {
   const videoPlayer = document.querySelector('.video-player');
   const videoButtonPlay = document.querySelector('.video-button__play');
   const videoButtonStop = document.querySelector('.video-button__stop');
   const videoTimePassed = document.querySelector('.video-time__passed');
   const videoProgress = document.querySelector('.video-progress');
   const videoTimeTotal = document.querySelector('.video-time__total');
   const videoVolume = document.querySelector('.video-volume');
   const videoFullscreen = document.querySelector('.video-fullscreen');
   const videoMute = document.querySelector('.video-mute-icon');
   const volumeUp = document.querySelector('.fa-volume-up');

   const toggleIcon = () => {
      if (videoPlayer.paused) {
         videoButtonPlay.classList.remove('fa-pause');
         videoButtonPlay.classList.add('fa-play');
      } else {
         videoButtonPlay.classList.add('fa-pause');
         videoButtonPlay.classList.remove('fa-play');
      }
   };

   const togglePlay = (event) => {
      event.preventDefault();
      if (videoPlayer.paused) {
         videoPlayer.play();
      } else {
         videoPlayer.pause();
      }
   };

   const stopPlay = () => {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
   };

   videoPlayer.volume = valueToVolume(videoVolume.value);
   videoMute.addEventListener('click', muteVolume.bind(null, videoVolume, videoPlayer, videoMute));
   volumeUp.addEventListener('click', maxVolume.bind(null, videoVolume, videoPlayer));
   videoVolume.addEventListener('input', changeValue.bind(null, videoVolume, videoPlayer, videoMute));
   videoPlayer.addEventListener('click', togglePlay);
   videoButtonPlay.addEventListener('click', togglePlay);
   videoPlayer.addEventListener('play', toggleIcon);
   videoPlayer.addEventListener('pause', toggleIcon);
   videoButtonStop.addEventListener('click', stopPlay);
   videoFullscreen.addEventListener('click', () => {
      videoPlayer.requestFullscreen();
   });

   // todo оптимізація для FireFox
   videoPlayer.addEventListener('fullscreenchange', () => {
      if (document.fullscreen) {
         videoPlayer.controls = true;
      } else {
         videoPlayer.controls = false;
      }
   });

   videoPlayer.addEventListener('timeupdate', () => {
      const currentTime = videoPlayer.currentTime;
      const duration = videoPlayer.duration;
      videoProgress.value = (currentTime / duration) * 100;
      let minutePassed = Math.floor(currentTime / 60);
      let secondsPassed = Math.floor(currentTime % 60);
      let minuteTotal = Math.floor(duration / 60);
      let secondsTotal = Math.floor(duration % 60);
      videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
      videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
   });

   videoProgress.addEventListener('input', () => {
      const duration = videoPlayer.duration;
      const value = videoProgress.value;
      videoPlayer.currentTime = (value * duration) / 100;
   });

   videoVolume.addEventListener('volumechange', () => {
      videoVolume.value = Math.round(videoPlayer.volume * 100);
   });

   videoPlayerInit.stop = () => {
      videoPlayer.pause();
      toggleIcon();
   }
};