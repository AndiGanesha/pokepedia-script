import React, { Component } from 'react';
import MyCard from './MyCard';
import InfiniteScroll from 'react-infinite-scroll-component';

var size = 16;

export default class List extends Component {

    constructor(props){
        super(props);

        this.state={
            myAllPoke: JSON.parse(localStorage.getItem('myPokeName')) || []
        }
    }

    fetchMoreData = () => {
        if (this.state.myAllPoke.length >= this.state.count) {
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
                {this.state.myAllPoke ? (
                <div className="row">
                    {this.state.myAllPoke.map(myAllPoke => (
                    <MyCard
                        key={myAllPoke}
                        name={myAllPoke}
                    />
                    ))}
                </div>
                ) : (
                <h1>Load Pokepedia</h1>
                )}
            </div>
        );
    }
}
