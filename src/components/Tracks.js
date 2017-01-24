require("./tracks.css")
import React, { PropTypes } from 'react'

const Tracks = ({tracks}) => (
  <ul >
    {tracks.map((track, i) =>
      <li key={i} className="tracks-container-item">
        <img className="album-img" src={track.cover} alt=""/>      
        <div className="album-links">
                  <a className="track-link"> {track.artist} - {track.name}</a>
                  <a className="album-link"> track.album.name </a>
        </div>
      </li>
    )}
  </ul>
)
//
Tracks.propTypes = {
  tracks: PropTypes.array.isRequired
}

export default Tracks
