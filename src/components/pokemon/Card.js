import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

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
    cursor: pointer;
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
        const{name , url} = this.props;
        const pokemonIndex= url.split('/')[url.split('/').length-2]; //splitting index from url that get from API
        const imageUrl= `https://img.pokemondb.net/artwork/large/${name}.jpg`;

        this.setState({name,imageUrl,pokemonIndex});
    }


    render() {
        
        return (
            <div className="col-md-3 col-sm-6 mb-3">
            <LinkStyle to={`pokemon/${this.state.pokemonIndex}`}>
                <CardStyle className='card'>
                    <h5 className='card-header'>{this.state.pokemonIndex}{}</h5>
                    <Sprite 
                        className='card-img-top rounded mx-auto mt-2'
                        src={this.state.imageUrl}
                    />
                    <div className='card-body mx-auto'>
                        <h5 className='card-title'>{this.state.name.toLowerCase().split("-").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ')}
                        </h5>
                    </div>
                </CardStyle>
                </LinkStyle>
            </div>
        )
    }
}
