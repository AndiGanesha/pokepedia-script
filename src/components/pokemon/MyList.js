import React, { Component } from 'react';
import MyCard from './MyCard';

export default class List extends Component {

    constructor(props){
        super(props);

        this.state={
            myAllPoke: JSON.parse(localStorage.getItem('myPokeName')) || []
        }
    }


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
