import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import './MyCard.css'

const Sprite = styled.img`
    height: 5rem;
    width: auto;
`;

const CardStyle = styled.div`
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.2s cubic-bezier(0.25, 0.7, 0.25, 0.3);
    &:hover{
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3), 0 10px 10px rgba(0, 0, 0, 0.2);
    }
`; 

const LinkStyle = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active{
        text-decoration: none;
    }
`;

export default class Card extends Component {
    state={
        name:'',
        imageUrl:'',
        pokemonIndex:''
    };

    componentDidMount(){
        const{name} = this.props;
        const pokemonIndex= name.split('-').pop(); //splitting index from url that get from API
        const imageUrl= `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

        this.setState({name,imageUrl,pokemonIndex});
    }

    handleClick = event => {
        const myAllPoke = JSON.parse(localStorage.getItem('myPokeName')) || []
        const index = myAllPoke.indexOf(this.state.name);
        if (index > -1) {
            myAllPoke.splice(index, 1);
          }
        localStorage.setItem('myPokeName', JSON.stringify(myAllPoke));
        window.location.reload();
    }

    render() {
        
        return (
            <div className="col-md-3 col-sm-6 mb-3">
                <CardStyle className='card'>
                    <h5 className='card-header'><span class="close" onClick={this.handleClick}>&times;</span></h5>
                    <Sprite 
                        className='card-img-top rounded mx-auto mt-2'
                        src={this.state.imageUrl}
                    />
                    <div className='card-body mx-auto'>
                        <h5 className='card-title'>{this.state.name
                        .toLowerCase().split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ').split('-').shift()}
                        </h5>
                    </div>
                </CardStyle>
            </div>
        )
    }
}