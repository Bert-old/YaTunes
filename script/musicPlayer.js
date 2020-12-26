import { addZero } from './supScript.js';

export function musicPlayerInit() {

	const audio = document.querySelector('.audio');
	const audioImg = document.querySelector('.audio-img');
	const audioHeader = document.querySelector('.audio-header');
	const audioPlayer = document.querySelector('.audio-player');
	const audioNavigation = document.querySelector('.audio-navigation');
	const audioButtonPlay = document.querySelector('.audio-button__play');
	const audioProgress = document.querySelector('.audio-progress');
	const audioTimePassed = document.querySelector('.audio-time__passed');
	const audioProgressTiming = document.querySelector('.audio-progress__timing');
	const audioTimeTotal = document.querySelector('.audio-time__total');



	const audioMute = document.querySelector('.audio-mute-icon');
	const volumeUp = document.querySelector('.audio-volume-up');
	const audioVolume = document.querySelector('.audio-volume');

	// todo в масиві назви файлів з папки аудіо
	const playList = ['hello', 'flow', 'speed'];

	let trackIndex = 0;

	const loadTrack = () => {
		const isPlayed = audioPlayer.paused;
		const track = playList[trackIndex];

		audioImg.src = `./audio/${track}.jpg`;
		audioHeader.textContent = track.toUpperCase();
		audioPlayer.src = `./audio/${track}.mp3`;

		if (isPlayed) {
			audioPlayer.pause();
		} else {
			audioPlayer.play();
		}
	};



	const prevTrack = () => {
		if (trackIndex !== 0) {
			trackIndex--;
		} else {
			trackIndex = playList.length - 1;
		}
		loadTrack();
	};


	const nextTrack = () => {
		if (trackIndex === playList.length - 1) {
			trackIndex = 0;
		} else {
			trackIndex++;
		}
		loadTrack();
	};




	// !!!! Volume

	let currValue = audioVolume.value;

	const changeValue = () => {
		const valueVolume = audioVolume.value;
		if (audioPlayer.muted) {
			audioPlayer.muted = false;
		}
		currValue = valueVolume;
		audioPlayer.volume = valueToVolume(valueVolume);
		// console.log(`input: ${valueVolume}, volume: ${audioPlayer.volume}`);
	};

	const muteVolume = () => {
		let prevValue = audioVolume.value;
		audioPlayer.muted = !audioPlayer.muted;
		if (prevValue != 0) {
			audioVolume.value = 0;
			currValue = prevValue;
		} else {
			audioVolume.value = currValue;
		}
	}


	const maxVolume = () => {
		const maxValue = 100;
		let prevValue = audioVolume.value;
		if (audioPlayer.muted) {
			audioPlayer.muted = false;
		}
		if (prevValue != maxValue) {
			audioVolume.value = maxValue;
			currValue = prevValue;
		} else {
			audioVolume.value = currValue;
		}

		audioPlayer.volume = valueToVolume(audioVolume.value);
	};

	audioMute.addEventListener('click', muteVolume);
	volumeUp.addEventListener('click', maxVolume);
	audioVolume.addEventListener('input', changeValue);

	// !!!! ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Volume ^^^^^^^^^^^^^^^^^^^^^^^^^^^^



	audioNavigation.addEventListener('click', event => {
		const target = event.target;

		if (target.classList.contains('audio-button__play')) {
			audio.classList.toggle('play');
			audioButtonPlay.classList.toggle('fa-play');
			audioButtonPlay.classList.toggle('fa-pause');

			if (audioPlayer.paused) {
				audioPlayer.play();
			} else {
				audioPlayer.pause();
			}
			const track = playList[trackIndex];
			audioHeader.textContent = track.toUpperCase();
		}



		if (target.classList.contains('audio-button__prev')) {
			prevTrack();
		}

		if (target.classList.contains('audio-button__next')) {
			nextTrack();
		}
	});

	audioPlayer.addEventListener('ended', () => {
		nextTrack();
		audioPlayer.play();
	});


	audioPlayer.addEventListener('timeupdate', () => {
		const duration = audioPlayer.duration;
		const currentTime = audioPlayer.currentTime;
		const progress = (currentTime / duration) * 100;

		audioProgressTiming.style.width = progress + '%';

		const minutesPassed = Math.floor(currentTime / 60) || '0';
		const secondsPassed = Math.floor(currentTime % 60) || '0';

		const minutesTotal = Math.floor(duration / 60) || '0';
		const secondsTotal = Math.floor(duration % 60) || '0';

		audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
		audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
	});

	audioProgress.addEventListener('click', event => {
		const x = event.offsetX;
		const allWidth = audioProgress.clientWidth;
		const progress = (x / allWidth) * audioPlayer.duration;
		audioPlayer.currentTime = progress;
	});


	musicPlayerInit.stop = () => {
		audioPlayer.pause();
		audioButtonPlay.classList.add('fa-play');
		audioButtonPlay.classList.remove('fa-pause');
		audio.classList.remove('play');
	}

	const valueToVolume = (audioValue) => audioValue / 100;

	audioPlayer.volume = valueToVolume(audioVolume.value);
}






// const musicPlayerInit = () => {

// };