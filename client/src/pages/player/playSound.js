import forest from '../../asset/musique/forest.mp3';
import storm from '../../asset/musique/storm.mp3';

let isAudioPlaying = false;
let audioStorm = null;
let audioForest = null;

function handleForestMeditation() {
if (!audioForest) {
audioForest = new Audio(forest);
}
if (isAudioPlaying && audioStorm) {
audioStorm.pause();
isAudioPlaying = false;
}
if (audioForest.paused) {
audioForest.play().catch(error => console.log(error));
isAudioPlaying = true;
} else {
audioForest.pause();
isAudioPlaying = false;
}
}

function handleStormSound() {
if (!audioStorm) {
audioStorm = new Audio(storm);
}
if (isAudioPlaying && audioForest) {
audioForest.pause();
isAudioPlaying = false;
}
if (audioStorm.paused) {
audioStorm.play().catch(error => console.log(error));
isAudioPlaying = true;
} else {
audioStorm.pause();
isAudioPlaying = false;
}
}

function MusicPlayer() {
return (
<div>
<button onClick={() => handleForestMeditation()}>Méditation dans la forêt</button>
<button onClick={() => handleStormSound()}>Son de tempête</button>
</div>
);
}

export default MusicPlayer;




