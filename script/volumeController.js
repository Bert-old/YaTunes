export { maxVolume, muteVolume, changeValue, valueToVolume, }

let currValue = '';
const valueToVolume = (audioValue) => audioValue / 100;

const changeVolumeIcon = (mute, volume) => {
   if (Number(volume.value) === 0) {
      mute.classList.remove('fa-volume-down');
      mute.classList.add('fa-volume-off');
   } else {
      mute.classList.add('fa-volume-down');
      mute.classList.remove('fa-volume-off');
   }
};

const changeValue = (volume, player, mute) => {
   if (player.muted) {
      player.muted = false;
   }
   currValue = volume.value;
   player.volume = valueToVolume(volume.value);
   changeVolumeIcon(mute, volume);
};

const maxVolume = (volume, player) => {
   const maxValue = 100;
   let prevValue = volume.value;
   if (Number(prevValue) !== Number(maxValue)) {
      volume.value = maxValue;
      currValue = prevValue;
   } else {
      volume.value = currValue;
   }
   player.volume = valueToVolume(volume.value);
};

const muteVolume = (volume, player, mute) => {
   const minVolume = 0;
   let prevValue = volume.value;
   player.muted = !player.muted;
   if (Number(prevValue) !== Number(minVolume)) {
      volume.value = 0;
      currValue = prevValue;
   } else {
      volume.value = currValue;
   }
   changeVolumeIcon(mute, volume);
};







