import axios from 'axios';
import React, { Component } from 'react';
import Card from './Card';
import InfiniteScroll from 'react-infinite-scroll-component';

var size = 16;

export default class List extends Component {

    state = {
        url: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=386', //1st-3rd gen only some pic of 4-8 cant be attached
        pokemon: null,
        pokemonShow: null,
        count: 386, //1st-3rd gen only
        hasMore: true
    };

    async componentDidMount(){
        const res = await axios.get(this.state.url);
        this.setState({pokemon: res.data['results']});
        this.setState({pokemonShow: this.state.pokemon.slice(0,size)});
        //this.setState({pokemon: this.state.pokemon.slice(size, this.state.count)}); //if needed from all pokemon
    }

    fetchMoreData = () => {
        if (this.state.pokemonShow.length >= this.state.count) {
          this.setState({hasMore: false });
          return;
        }
        setTimeout(() => {
          size = 16+size; //resize the data with the request from user
          this.setState({pokemonShow: this.state.pokemon.slice(0,size)});
        }, 1500);
      };


    render() {
        return (
            <div>
                {this.state.pokemonShow ? (
                    <InfiniteScroll 
                            dataLength={this.state.pokemonShow.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={<h4 style={{textAlign:'center'}}>Load Data Pokepedia...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen all 3rd Gen</b>
                                </p>
                            }
                    >
                        <div className='row'>
                            {this.state.pokemonShow.map(pokemonShow => (
                                <Card 
                                    key={pokemonShow.name}
                                    name={pokemonShow.name}
                                    url={pokemonShow.url}
                                />
                            ))}
                        </div>
                    </InfiniteScroll>) : (
                <h1>Load Pokepedia</h1>
                )}
            </div>
        );
    }
}
