import React from 'react'
import LibrarySong from './LibrarySong'

function Library({songs, setCurrentSong, audioRef, isPlaying}) {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map( song => <LibrarySong 
                    id={song.id} 
                    key={song.id} 
                    songs={songs} 
                    setCurrentSong={setCurrentSong} 
                    song={song}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                />)}
            </div>
        </div>
    )
}

export default Library;
