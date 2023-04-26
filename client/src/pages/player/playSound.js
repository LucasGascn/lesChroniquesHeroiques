import forest from '../../assets/musique/forest.mp3';
import storm from '../../assets/musique/storm.mp3';
import wind from '../../assets/musique/wind.mp3'
const audioFiles = [
{name: 'forest', url: forest},
{name: 'storm', url: storm},
{name: 'wind', url: wind},
];

let isAudioPlaying = false;
let currentAudio = null;

const audioInstances = {};

audioFiles.forEach((audioFile) => {
  audioInstances[audioFile.name] = new Audio(audioFile.url);
});

function handleAudioButtonClick(audioName) {
  if (!currentAudio || currentAudio.name !== audioName) {
    if (currentAudio) {
    currentAudio.instance.pause();
  }
  currentAudio = {name: audioName, instance: audioInstances[audioName]};
  currentAudio.instance.play().catch(error => console.log(error));
  isAudioPlaying = true;
  } else {
  if (isAudioPlaying) {
    currentAudio.instance.pause();
    isAudioPlaying = false;
  } else {
      currentAudio.instance.play().catch(error => console.log(error));
      isAudioPlaying = true;
    }
  }
}

function MusicPlayer() {
  return (
    <div>
      {audioFiles.map((audioFile) => (
        <button key={audioFile.name} onClick={() => handleAudioButtonClick(audioFile.name)}>
        {audioFile.name}</button>
      ))}
    </div>
  );
}

export default MusicPlayer;