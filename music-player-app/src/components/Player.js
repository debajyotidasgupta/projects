import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

function Player({ songInfo, setSongInfo, audioRef, currentSong, isPlaying, setIsPlaying }) {

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.target.currentTime = e.target.value;
        setSongInfo({
            ...songInfo,
            currentTime: e.target.value
        })
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{ getTime(songInfo.currentTime) }</p>
                <input
                    onChange={ dragHandler }
                    min={ 0 }
                    max={ songInfo.duration }
                    value={ songInfo.currentTime }
                    type="range"
                />
                <p>{ getTime(songInfo.duration) }</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={ faAngleLeft } />
                <FontAwesomeIcon className="play" size="2x" icon={ isPlaying ? faPause : faPlay } onClick={ playSongHandler } />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={ faAngleRight } />
            </div>
        </div>
    )
}

export default Player;
