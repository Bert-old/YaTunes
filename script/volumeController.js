export { maxVolume, muteVolume, changeValue }




const audio = document.querySelector('.audio');

let currValue = audio.value;


const changeValue = (volume, player, mute) => {

	if (player.muted) {
		player.muted = false;
	}
	currValue = volume.value;
	player.volume = volume.value / 100;

	if (volume.value == 0) {
		mute.classList.remove('fa-volume-down');
		mute.classList.add('fa-volume-off');
	} else {
		mute.classList.add('fa-volume-down');
		mute.classList.remove('fa-volume-off');
	}
};



const maxVolume = (volume, player) => {
	const maxValue = 100;
	let prevValue = volume.value;
	if (prevValue != maxValue) {
		volume.value = maxValue;
		currValue = prevValue;
	} else {
		volume.value = currValue;
	}
	player.volume = volume.value / 100;
};

const muteVolume = (volume, player, mute) => {
	let prevValue = volume.value;
	player.muted = !player.muted;
	if (prevValue != 0) {
		currValue = audio.volume;
		volume.value = 0;
		currValue = prevValue;
		mute.classList.remove('fa-volume-down');
		mute.classList.add('fa-volume-off');
	} else {
		volume.value = currValue;
		mute.classList.add('fa-volume-down');
		mute.classList.remove('fa-volume-off');
	}
};







