import React from 'react';
import {connect} from 'react-redux';

import {filterGames} from '../actions/games';

export class Toolbar extends React.Component {

  handleSearchInput(value) {
    this.props.dispatch(filterGames(value));
  }

  render() {

    return (
      <form>
        <input onChange={e => this.handleSearchInput(e.target.value)}>
        </input>
        <button type="submit">Search</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  searchTerm: state.games.searchTerm
})

export default connect(mapStateToProps)(Toolbar);