import { addZero } from './supScript.js';
import { toggleVolumeIcon } from './toggleVolumeIcon.js';
// import { valueToVolume, changeValue } from './volumeController.js';

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


	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	const valueToVolume = (videoValue) => videoValue / 100;
	videoPlayer.volume = valueToVolume(videoVolume.value);

	let currValue = videoVolume.value;

	const changeValue = () => {
		const valueVolume = videoVolume.value;
		if (videoPlayer.muted) {
			videoPlayer.muted = false;
		}
		currValue = valueVolume;
		videoPlayer.volume = valueToVolume(valueVolume);
		// console.log(`input: ${valueVolume}, volume: ${videoPlayer.volume}`);

		toggleVolumeIcon(videoVolume, videoMute);
	};

	const muteVolume = () => {
		let prevValue = videoVolume.value;
		videoPlayer.muted = !videoPlayer.muted;

		if (prevValue != 0) {
			currValue = videoPlayer.volume;
			videoVolume.value = 0;
			currValue = prevValue;
			videoMute.classList.remove('fa-volume-down');
			videoMute.classList.add('fa-volume-off');
		} else {
			videoVolume.value = currValue;
			videoMute.classList.add('fa-volume-down');
			videoMute.classList.remove('fa-volume-off');
		}
	};

	const maxVolume = () => {
		const maxValue = 100;
		let prevValue = videoVolume.value;
		if (videoPlayer.muted) {
			videoPlayer.muted = false;
		}
		if (prevValue != maxValue) {
			videoVolume.value = maxValue;
			currValue = prevValue;
		} else {
			videoVolume.value = currValue;
		}

		videoPlayer.volume = valueToVolume(videoVolume.value);
	};

	videoMute.addEventListener('click', muteVolume);
	volumeUp.addEventListener('click', maxVolume);


	// !!!!!!!!!!!!!!!


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

	videoVolume.addEventListener('input', changeValue);

	videoVolume.addEventListener('volumechange', () => {
		videoVolume.value = Math.round(videoPlayer.volume * 100);
	});

	// changeValue();
	videoPlayerInit.stop = () => {
		videoPlayer.pause();
		toggleIcon();
	}

}