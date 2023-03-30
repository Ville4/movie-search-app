import { searchAPI, searchType } from "../API/api"
import { actionsType, BaseThunkType } from "./redux-store"

const initialState = {
    movies: [] as Array<searchType> | never[],
    isLoading: false,
    errorMessage: null as null | string,
    totalMoviesCount: null as null | number,
    movietitle: null as null | string
}

type initialStateType = typeof initialState

type appActionsType = actionsType<typeof actions>

const appReducer = (state: initialStateType =  initialState, action:appActionsType) => {
    switch(action.type) {
        case 'GET_MOVIES': {
            return{
                ...state,
                movies: action.movies, 
                
            } 
        }
        case 'SEARCH_MOVIE': {
            return{
                ...state,
                movies: action.searchValue,
            }
        }
        case 'SHOW_ERROR': {
            return{
                ...state,
                errorMessage: action.error,
            }
        }
        case 'IS_LOADING': {
            return{
                ...state,
                isLoading: action.isLoad,
            }
        }
        case 'test': {
            return{
                ...state,
                movietitle: action.movietitle,
            }
        }
        case 'SET_TOTAL_MOVIES_COUNT': {
            return{
                ...state,
                totalMoviesCount: action.moviesCount,
            }
        }
        default: return state
    }
}

export const actions = {
    getMovies: (movies: Array<searchType>) => {
        return {
            type: 'GET_MOVIES',
            movies
        } as const
    },
    searchMovies: (searchValue: Array<searchType>) => {
        return {
            type: 'SEARCH_MOVIE',
            searchValue
        } as const
    },
    showError: (error: string | null) => {
        return {
            type: 'SHOW_ERROR',
            error
        } as const
    },
    isLoading: (isLoad :boolean) => {
        return {
            type: 'IS_LOADING',
            isLoad
        } as const
    },
    setMovietitle: (movietitle :string) => {
        return {
            type: 'test',
            movietitle
        } as const
    },
    setTotalMoviesCount: (moviesCount :number| null) => {
        return {
            type: 'SET_TOTAL_MOVIES_COUNT',
            moviesCount
        } as const
    },   
}

type appThunkType = BaseThunkType<appActionsType>

export const getInitialMoviesThunk = (): appThunkType => {
    return async (dispatch) => { 
        dispatch(actions.isLoading(true))
        const response = await searchAPI.getInitialMovies()
        dispatch(actions.isLoading(false))
        if(response.Response === 'True') {
            dispatch(actions.getMovies(response.Search))
        } else {
            dispatch(actions.showError(response.Error))
        }
    }
}

export const searchMoviesThunk = (searchValue: string, page:number): appThunkType => {
    return async (dispatch) => {
        dispatch(actions.isLoading(true))
        dispatch(actions.setMovietitle(searchValue))
        dispatch(actions.showError(null))
        const response = await searchAPI.searchMovies(searchValue, page)
        dispatch(actions.isLoading(false))
        if(response.Response === 'True') {
            dispatch(actions.searchMovies(response.Search))
            dispatch(actions.setTotalMoviesCount(response.totalResults))
        } else {
            dispatch(actions.showError(response.Error))
        }
    }
}

export default appReducer