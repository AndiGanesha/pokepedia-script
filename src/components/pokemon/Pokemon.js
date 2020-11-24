import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import './Pokemon.css';


const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
  };

const Logo = styled.img`
  height: 1.9rem;
  width: 1.9rem;
  margin: 0.3rem;
`;

export default class Pokemon extends Component {

    state= {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description:'',
        stats:{
            hp:'',
            attack:'',
            defense:'',
            specialAttack:'',
            specialDefense:''
        },
        height:'',
        weight:'',
        moves:'',
        abilities:'',
        genderRatioMale:'',
        genderRatioFemale:'',
        evs:'',
        hatchStep:'',
        catch:false,
        width:window.innerWidth,
        afterClick:false
    };

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
      }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
      };


    handleClick = event => {
        var modal = document.getElementById("myModal");

        if ((Math.random()*100) >= 50){
            this.setState({catch:true});
        }else{
            this.setState({catch:false});
        }

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }
    }

    handleSubmit = event =>{
        var modal = document.getElementById("myModal");
        var myPokeNameValue = JSON.parse(localStorage.getItem('myPokeName')) || [];
        const myAllPoke = myPokeNameValue.map(name => {
            return name
            .toLowerCase().split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ').split('-').shift().toLowerCase();
        }).join(', ');

        const newPoke = document.getElementById('inputValue').value.toLowerCase();

        if (!myAllPoke.includes(newPoke)){
            const newPoke = document.getElementById('inputValue').value+'-'+this.state.pokemonIndex;
            myPokeNameValue.push(newPoke);
            localStorage.setItem('myPokeName', JSON.stringify(myPokeNameValue));
            modal.style.display = "none";
            setTimeout(function() { //Start the timer
                window.location.reload();//After 1 second, set render to true
            }.bind(this), 500)
        }else{
            alert('this name has been taken by other pokemon')
        }
    }


    async componentDidMount(){
        const{pokemonIndex} = this.props.match.params;

        //Url Data
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpecUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        //Get Pokemon info
        const pokemonRes = await Axios.get(pokemonUrl);

        const name = pokemonRes.data.name;
        const imageUrl = `https://img.pokemondb.net/artwork/large/${name}.jpg`;

        let{hp, attack, defense, speed, specialAttack, specialDefense} = '';

        pokemonRes.data.stats.map(stat => {
            switch(stat.stat.name){
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
                default:
                    break;
            }
        });

        const height =
            Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;

        const weight =
            Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;
        
        const types = pokemonRes.data.types.map(type => type.type.name);
        const moves = pokemonRes.data.moves.map(move => {
            return move.move.name
            .toLowerCase().split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        }).join(', ');
        const abilities = pokemonRes.data.abilities.map(ability => {
            return ability.ability.name
            .toLowerCase().split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        }).join(', ');

        const evs = pokemonRes.data.stats.filter(stat => {
            if(stat.effort > 0){
                return true;
            }
            return false;
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')}`;
        })
        .join(', ');

        //get poke desc

        await Axios.get(pokemonSpecUrl).then (res => {
            let description ='';
            res.data.flavor_text_entries.some(flavor =>{
                if(flavor.language.name === 'en'){
                    description = flavor.flavor_text;
                    return;
                }
            });
        

        //gender rate
        const femaleRate = res.data['gender_rate'];
        const genderRatioFemale = 12.5*femaleRate;
        const genderRatioMale = 12.5*(8-1);

        const catchRate = res.data['capture_rate']
        const hatchSteps = 255*(res.data['hatch_counter']+1);

        const eggGroups = res.data['egg_groups']
        .map(group => {
          return group.name
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })
        .join(', ');

        this.setState({
            description,
            genderRatioMale,
            genderRatioFemale,
            catchRate,
            eggGroups,
            hatchSteps
        });
    });

    this.setState({
        imageUrl,
        pokemonIndex,
        name,
        types,
        moves,
        stats: {
          hp,
          attack,
          defense,
          speed,
          specialAttack,
          specialDefense
        },
        height,
        weight,
        abilities,
        evs
      });

    }

    handleBtnClk = event =>{
        window.location.reload();
    }
    
    render() {
        const { width } = this.state;
        const isMobile = width <= 767;

        return (
            <div className='col'>
                <div className='card'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col-5'>
                                <h5>{this.state.pokemonIndex}</h5>
                            </div>
                            <div className='col-7'>
                                <div className='float-right'>
                                    {this.state.types.map(type =>(
                                        <span key={type} className='badge badge-pill mr-1' style={{backgroundColor: `#${TYPE_COLORS[type]}`,color: 'white'}}>
                                            {type 
                                                .toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                                            }
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='row align-items-center'>
                            <div className='col-md-3'>
                                <img src={this.state.imageUrl}
                                    className='card-img-top rounded mx-auto mt-2' />
                            </div>
                            <div className={isMobile ? 'mx-auto text-center' : 'col-md-9'}>
                                <h4>
                                    {this.state.name.toLowerCase()
                                    .split(' ')
                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')}
                                </h4>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        HP
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.hp}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.hp}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Attack
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.attack}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.attack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Defense
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.defense}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.defense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Speed
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.speed}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.speed}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Sp Atk
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.specialAttack}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow={this.state.stats.specialAttack}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.specialAttack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Sp Def
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                width: `${this.state.stats.specialDefense}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow={this.state.stats.specialDefense}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.specialDefense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-1'>
                            <div className='col'>
                                <br />
                                <p className='text-center'>{this.state.description}</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='card-body'>
                        <h3 className='card-tittle text-center'>
                            Profile
                        </h3>
                        <div className='row'>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-6">
                                        <br />
                                        <h6 className="float-right">Height:</h6>
                                    </div>
                                    <div className="col-6">
                                        <br />
                                        <h6 className="float-left">{this.state.height}ft. </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-right">Weight:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-left">{this.state.weight}lbs. </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-right">Catch Rate:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-left">{this.state.catchRate} </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-right">Egg Groups:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-left">{this.state.eggGroups} </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-right">Hatch Steps:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-left">{this.state.hatchSteps}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-right">Abilities:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-left">{this.state.abilities}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-right">EVs:</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="float-left">{this.state.evs}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <h5 className={isMobile ? 'text-center' : 'float-left'}>
                                            {isMobile? <br /> : null}
                                            Moves:
                                        </h5>
                                    <div className='col-md-12'>
                                        <p className='text-center'>
                                            {this.state.moves}
                                        </p>
                                    </div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card-footer text-center'> 
                        <button id="myBtn" onClick={this.handleClick}>
                            <Logo src = 'https://cdn2.iconfinder.com/data/icons/pokemon-filledoutline/64/pokeball-people-pokemon-nintendo-video-game-gaming-gartoon-ball-512.png' />
                            Catch Them!
                            <Logo src = 'https://cdn2.iconfinder.com/data/icons/pokemon-filledoutline/64/pokeball-people-pokemon-nintendo-video-game-gaming-gartoon-ball-512.png' />
                        </button>
                        <div id="myModal" class="modal">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h2>Result</h2>
                                    <span class="close">&times;</span>
                                </div>
                                <div class="modal-body">
                                    { this.state.catch ? 
                                        <form className='form-group' onSubmit={this.handleSubmit}>
                                            <p>Got Em! Give Nickname!</p>
                                            <br />
                                            <input type='text' className='form-control-plaintext' placeholder='Pokemon Nickname' id='inputValue'></input>
                                            <br />
                                            <button onClick={this.handleBtnClk} type="submit" class="btn btn-primary mt-3">Catch</button>
                                        </form> : <p>Next Time!</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

