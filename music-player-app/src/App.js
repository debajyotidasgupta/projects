import React, { useRef, useState } from 'react'

//----------   STYLES   ------------
import './styles/app.scss';

//---------- COMPONENTS ------------
import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library'

//----------    DATA    ------------
import data from './util';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration
    })
  }

  return (
    <div className="App">
      <Song currentSong={ currentSong } />
      <Player
        setSongInfo={ setSongInfo }
        songInfo={ songInfo }
        audioRef={ audioRef }
        isPlaying={ isPlaying }
        setIsPlaying={ setIsPlaying }
        currentSong={ currentSong }
      />
      <Library isPlaying={ isPlaying } audioRef={ audioRef } songs={ songs } setCurrentSong={ setCurrentSong } />
      <audio onLoadedMetadata={ timeUpdateHandler } onTimeUpdate={ timeUpdateHandler } ref={ audioRef } src={ currentSong.audio }></audio>
    </div>
  );
}

export default App;
