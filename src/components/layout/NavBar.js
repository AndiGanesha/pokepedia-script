import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Logo = styled.img`
  height: 1.9rem;
  width: 1.9rem;
  margin-right: 0.3rem;
`;

export default class NavBar extends Component {
    constructor(props){
        super(props);

        this.state={
            myAllPoke: JSON.parse(localStorage.getItem('myPokeName')) || []
        }
    }

    render() {
        return (
            <nav class="navbar navbar navbar-dark bg-primary fixed-top">
                <Link class="navbar-brand" to="/" alt=""><Logo src='https://cdn2.iconfinder.com/data/icons/pokemon-filledoutline/64/pokeball-people-pokemon-nintendo-video-game-gaming-gartoon-ball-512.png'>
                </Logo>Pokepedia
                </Link>
                <div>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item ml-auto mr-3">
                            <Link class="nav-link navbar-brand" to="/mypokemonlist" alt=''>My Pokemon : {this.state.myAllPoke.length}</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
