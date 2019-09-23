import { PokemonData, Pokemon } from '../models/pokemonModels';
import { AppAction } from '../../shared/models/appAction';
import { PaginatedResponse } from '../../shared/models/httpModels';
import * as getPokemons from '../actions/getPokemonsActions';
import * as getPokemonData from '../actions/getPokemonDataActions';

export interface PokemonState {
    pagination: PaginatedResponse<Pokemon>;
    pokemonsData: PokemonData[];
    isFetching: boolean;
}

const initialState: PokemonState = {
    pagination: {
        count: 0,
        results: [],
    },
    pokemonsData: [],
    isFetching: false,
};

export type PokemonAction = getPokemons.GetPokemonsActions | getPokemonData.GetPokemonDataActions;

export const pokemonReducer = (state = initialState, action: AppAction) => {
    switch (action.type) {
        case getPokemons.GET_POKEMONS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case getPokemons.GET_POKEMONS_SUCCESS:
            return {
                ...state,
                pagination: action.payload,
                isFetching: false,
            };

        case getPokemons.GET_POKEMONS_FAILURE:
            return {
                ...state,
                isFetching: false,
            };

        case getPokemonData.GET_POKEMON_DATA_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case getPokemonData.GET_POKEMON_DATA_SUCCESS:
            return {
                ...state,
                pokemonsData: [...state.pokemonsData, action.payload],
                isFetching: false,
            };

        case getPokemonData.GET_POKEMON_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
            };

        default:
            return state;
    }
};