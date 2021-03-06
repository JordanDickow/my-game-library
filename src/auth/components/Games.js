import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'

class Games extends Component {
  constructor (props) {
    super(props)

    this.state = {
      games: [],
      loaded: false,
      error: null
    }
  }

  async componentDidMount () {
    // api request!!
    // axios(`${apiUrl}/movies`)
    //   .then(res => this.setState({ movies: res.data.movies, loaded: true }))
    //   .catch(err => this.setState({ error: err.message }))
    try {
      const response = await axios({
        url: `${apiUrl}/games`,
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })

      this.setState({ games: response.data.games, loaded: true })
    } catch (error) {
      console.error(error)
      this.setState({ error: error.message })
    }
  }
  render () {
    const { games, error, loaded } = this.state
    const gamesList = games.map(game => (
      <li key={game.id}>
        <Link to={`/games/${game.id}`}>{game.title}</Link>
      </li>

    ))
    if (!loaded) {
      return <p>Loading...</p>
    }
    if (error) {
      return <p>Error: {error}</p>
    }
    return (
      <div>
        <h4>Your Games</h4>
        <ul>
          {gamesList}
        </ul>
      </div>
    )
  }
}

export default Games
