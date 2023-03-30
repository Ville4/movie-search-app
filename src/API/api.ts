import  axios from 'axios'

export const instance = axios.create ({
    baseURL: 'http://www.omdbapi.com',  
})

export type searchType = {
    Title: string
    Poster: string
    Year: string
    imdbID: string
    Type: string
}

type getInitialMoviesType = {
    Response: string
    Search: Array<searchType>
    Error: string | null
    totalResults: number | null
}

export const searchAPI = {
    async getInitialMovies() {
        const response = await instance.get<getInitialMoviesType>('?apikey=d2dcfcd&s=man')
        return response.data
    },
    async searchMovies(searchValue:string, page:number) {
        const response = await instance.get<getInitialMoviesType>(`?apikey=d2dcfcd&s=${searchValue}&page=${page}`)
        return response.data
    },
}
