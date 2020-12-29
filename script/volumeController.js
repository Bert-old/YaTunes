
export { maxVolume, currValue, audioVolume }

// const valueToVolume = (audioValue) => audioValue / 100;


const audioVolume = document.querySelector('.audio-volume');
const audioPlayer = document.querySelector('.audio-player');

// audioPlayer.volume = volume.value / 100;
let currValue = audioVolume.value;



// const changeValue = (volume, player) => {
// 	const valueVolume = volume.value;
// 	if (player == 0) {
// 		player == valueVolume;
// 	}
// 	currValue = valueVolume;
// 	player.volume = valueToVolume(valueVolume);
// };

// const muteVolume = (player, volume) => {

// 	let prevValue = volume.value;
// 	player.muted = !player.muted;
// 	if (prevValue != 0) {
// 		volume.value = 0;
// 		currValue = prevValue;
// 	} else {
// 		volume.value = currValue;
// 	}
// };


const maxVolume = (volume, player) => {
	const maxValue = 100;
	let prevValue = volume.value;
	if (player == 0) {
		// player.muted = false;
	}
	if (prevValue != maxValue) {
		volume.value = maxValue;
		currValue = prevValue;
	} else {
		volume.value = currValue;
	}

	// player.volume = valueToVolume(volume.value);
	audioPlayer.volume = volume.value / 100;
	console.log(audioPlayer.volume);
};


// function bindVolume(player, volume) {
// 	player.volume = valueToVolume(volume.value);
// }











	// let currValue = audio.volume;
	// const muteVolume = () => {
	// 	if (audioVolume.value != 0) {
	// 		currValue = audio.volume;
	// 		audio.volume = 0;
	// 	} else {
	// 		audio.volume = currValue;
	// 	}
	// };
	// audioVolume.value = audio.volume * 100;