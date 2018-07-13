import React from 'react';
import {connect} from 'react-redux';

import {filterGames} from '../actions/games';

export class Toolbar extends React.Component {

  handleSearchInput(value) {
    this.props.dispatch(filterGames(value));
  }

  handleSearchSubmit(event) {
    event.preventDefault();
  }

  render() {

    return (
      <form className="toolbar">
        <input className="search-bar" onChange={e => this.handleSearchInput(e.target.value)}>
        </input>
        <button className="search-submit" type="submit" onClick={e => this.handleSearchSubmit(e)}>Search</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  searchTerm: state.games.searchTerm
})

export default connect(mapStateToProps)(Toolbar);