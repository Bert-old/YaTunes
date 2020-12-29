export const toggleVolumeIcon = (volume, mute) => {
	if (volume.value == 0) {
		mute.classList.remove('fa-volume-down');
		mute.classList.add('fa-volume-off');
	} else {
		mute.classList.add('fa-volume-down');
		mute.classList.remove('fa-volume-off');
	}
};

