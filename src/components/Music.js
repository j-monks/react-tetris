import React, { Component } from "react"
import Start from "../music/start.mp3"

export default class extends Component {
  playAudio() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  }

  render() {
    return (
      <div>
        <button onClick={this.playAudio}>
          <span>Play Audio</span>
        </button>
        <audio className="audio-element">
          <source src={Start}></source>
        </audio>
      </div>
    )
  }
}