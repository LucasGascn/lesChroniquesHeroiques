import React, { useState } from 'react';
import { Howl, Howler } from 'howler';

const MusicPlayer = () => {
  const forestMeditationSrc = '/client/asset/musique/forestMeditation.mp3';
  const combatSrc = '/client/asset/musique/combat.mp3';

  const [forestMeditationSound] = useState(new Howl({
    src: [forestMeditationSrc],
    preload: true,
  }));

  const [combatSound] = useState(new Howl({
    src: [combatSrc],
    preload: true,
  }));

  const playSound = (sound) => {
    if (Howler.ctx.state === 'suspended') {
      Howler.ctx.resume();
    }
    sound.play();
  };
  
  return (
    <div>
      <button onClick={() => playSound(combatSound)}>
        Combat
      </button>
      <div onClick={() => playSound(forestMeditationSound)}>
        Forest Meditation
      </div>
    </div>
  );
  }
export default MusicPlayer;
