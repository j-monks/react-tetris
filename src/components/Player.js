import React from "react";
import Icon from "../icons/PlayerIcons";
import audioMp3 from "../music/mid.mp3";



class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlaying: false,
	    track: false,
      volumeLevel: '',
    };
    
    const audioCtx = window.AudioContext || window.webkitAudioContext;
    if (audioCtx) {
	  this.audioCtx = new audioCtx();
	  this.gainNode = this.audioCtx.createGain();
    } else {
      throw new Error("It's broke my guy");
  }
  }
  playPauseAudio = evt => {
    evt.preventDefault();

    const audioElement = document.querySelector(".audio-file");

    if (!this.state.track) {
      this.track = this.audioCtx.createMediaElementSource(audioElement);
      this.setState({ track: true });
    }
    this.track.connect(this.gainNode).connect(this.audioCtx.destination);
    if (this.audioCtx.state === 'suspended') {
    	this.audioCtx.resume();
    }
    if (!this.state.isPlaying) {
      audioElement.play();
      this.setState({ isPlaying: true });
    } else {
      audioElement.pause();
      this.setState({ isPlaying: false });
    }

  };

  changeVolume = evt => {
    evt.preventDefault();

	const volumeControl = document.querySelector('[data-action="volume"]');
	this.gainNode.gain.value = volumeControl.value;
  };

  

  muteSound = evt => {
  evt.preventDefault();

	this.setState({volumeLevel : this.gainNode.gain.value}) 
	this.gainNode.gain.value = 0;

	if(this.state.volumeLevel)
	{
		this.gainNode.gain.value = this.state.volumeLevel;
	}	
  

  }

  render() {
    var style = {
      color: 'black',
      fontSize: 15,
      marginTop: 15,
      marginLeft: 15
    };
    
    return (
      <div className="container">
        <audio className="audio-file" src={audioMp3} crossOrigin="anonymous" />
        <div className="track-container">
          <div className="control-buttons">
            <button className="tape-controls-play" style={style}
              onClick={evt => this.playPauseAudio(evt)}>BEATS

              {!this.state.isPlaying ? (
                <span className='play-button'><Icon iconName="play" /></span>
              ) : (
                <Icon iconName="pause" />
              )}

          </button>
          </div>
          </div> 
          <div className='volume-container'>
          <div className='menu-buttons'>
          </div>
          <div className="volume-slider">
            <input
              type="range"
              id="volume"
              className="control-volume"
              min="0"
              max="2"
              list="gain-vals"
              step="0.01"
              data-action="volume"
              onInput={evt => this.changeVolume(evt)}
            />
            <datalist id="gain-vals">
              <option value="0" label="min" />
              <option value="2" label="max" />
            </datalist>
          </div>
          </div>
      </div>
    );
  }
}

export default Player;
