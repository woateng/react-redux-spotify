import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { search, selectFilter, fetchAlbumsIfNeeded, fetchTracksIfNeeded } from '../actions'
import Picker from '../components/Picker'
import Albums from '../components/Albums'
import Tracks from '../components/Tracks'
import Search from '../components/Search'

class App extends Component {
  static propTypes = {

    selectedFilter: PropTypes.number.isRequired,
    albums: PropTypes.array.isRequired,
    tracks: PropTypes.array.isRequired,
    isFetching: PropTypes.bool,
    searchTerm: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, searchTerm } = this.props
    dispatch(fetchAlbumsIfNeeded(searchTerm))
    dispatch(fetchTracksIfNeeded(searchTerm))
  }

  componentWillReceiveProps(nextProps) {////////////////////////////////////////////
    if (nextProps.searchTerm !== this.props.searchTerm) {
      const { dispatch, searchTerm } = nextProps
      dispatch(fetchAlbumsIfNeeded(searchTerm))
      dispatch(fetchTracksIfNeeded(searchTerm))
    }
  }

  handleClick = (event) => {
    var nextFilter = Number.parseInt(event.currentTarget.dataset.id)
    this.props.dispatch(selectFilter(nextFilter))
  }
  handleSearch = nextTerm => {
    this.props.dispatch(search(nextTerm))
  }

  render() {
    const { selectedFilter, albums, tracks, isFetching, searchTerm } = this.props
    const isEmpty = albums.length === 0

    return (
      <div>
        <Search   value={searchTerm}
                  onKeyUp={this.handleSearch} />
        <Picker 
                  onClick={this.handleClick}/>      
        {selectedFilter ? <Tracks tracks={tracks} /> : <Albums albums={albums} />}  
      </div>
    )
  }
}

const mapStateToProps = state => {
  //debugger;
  const { selectedFilter, albumsByArtist, tracksByArtist, searchTerm} = state     //var selectedFilter = state.selectedFilter;
  
  const {
    items: albums
  } = albumsByArtist.items ||  
  {
    items: []
  }

  const {
    items: tracks
  } = tracksByArtist.items ||  
  {
    items: []
  }



  return {
    selectedFilter,
    albums,
    tracks,
    searchTerm
  }
}

export default connect(mapStateToProps)(App)
