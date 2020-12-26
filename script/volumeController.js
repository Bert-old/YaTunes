let currValue = audioVolume.value;

const changeValue = (player) => {
	const valueVolume = audioVolume.value;
	player.volume = valueVolume / 100;
	prevValue = valueVolume;
	player.muted = false;

};

const muteVolume = (player) => {
	let currValue = audioVolume.value;
	player.muted = !audioPlayer.muted;
	if (currValue != 0) {
		audioVolume.value = 0;
		prevValue = currValue;
	} else {
		audioVolume.value = prevValue;
	}
}


const maxVolume = (player, controller) => {
	audioVolume.value = 100;
	player.volume = 1;
};