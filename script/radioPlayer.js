import { toggleVolumeIcon } from './toggleVolumeIcon.js';

export function radioPlayerInit() {

	const radio = document.querySelector('.radio');
	const radioCoverImg = document.querySelector('.radio-cover__img');
	const radioHeaderBig = document.querySelector('.radio-header__big');
	const radioNavigation = document.querySelector('.radio-navigation');
	const radioItem = document.querySelectorAll('.radio-item');
	const radioStop = document.querySelector('.radio-stop');

	const radioVolume = document.querySelector('.radio-volume');
	const radioMute = document.querySelector('.radio-mute-icon');

	const audio = new Audio();
	audio.type = 'audio/aac';
	radioStop.disabled = true;

	const selectItem = elem => {
		radioItem.forEach(item => item.classList.remove('select'));
		elem.classList.add('select');
	};

	const changeIconPlay = () => {
		if (audio.paused) {
			radio.classList.remove('play');
			radioStop.classList.add('pa-play');
			radioStop.classList.remove('fa-stop');
		} else {
			radio.classList.add('play');
			radioStop.classList.remove('pa-play');
			radioStop.classList.add('fa-stop');
		}
	};


	const valueToVolume = (audioValue) => radioVolume.value / 100;
	audio.volume = valueToVolume(radioVolume.value);

	let currValue = radioVolume.value;
	const muteVolume = () => {
		let prevValue = radioVolume.value;
		audio.muted = !audio.muted;
		if (prevValue != 0) {
			currValue = audio.volume;
			radioVolume.value = 0;
			currValue = prevValue;
			radioMute.classList.remove('fa-volume-down');
			radioMute.classList.add('fa-volume-off');
		} else {
			radioVolume.value = currValue;
			radioMute.classList.add('fa-volume-down');
			radioMute.classList.remove('fa-volume-off');
		}
	};
	const changeValue = () => {
		const valueVolume = radioVolume.value;
		if (audio.muted) {
			audio.muted = false;
		}
		currValue = valueVolume;
		audio.volume = valueToVolume(valueVolume);
		// console.log(`input: ${valueVolume}, volume: ${audio.volume}`);

		toggleVolumeIcon(radioVolume, radioMute);
	};




	radioNavigation.addEventListener('change', event => {
		const target = event.target;
		const parrent = target.closest('.radio-item');
		selectItem(parrent);

		const title = parrent.querySelector('.radio-name').textContent;
		radioHeaderBig.textContent = title;

		const urlImg = parrent.querySelector('.radio-img').src;
		radioCoverImg.src = urlImg;


		radioStop.disabled = false;
		audio.src = target.dataset.radioStantion;
		audio.play();
		changeIconPlay();

	});

	radioStop.addEventListener('click', () => {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
		changeIconPlay();
	});

	radioVolume.addEventListener('input', changeValue);
	radioMute.addEventListener('click', muteVolume);

	radioPlayerInit.stop = () => {
		audio.pause();
		changeIconPlay();
	}
};