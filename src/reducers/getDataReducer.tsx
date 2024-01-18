import {createSlice, PayloadAction, createAsyncThunk, configureStore} from "@reduxjs/toolkit";
import {IKinopoisk} from "../models/IKinopoisk";
import {KinopoiskDev} from "@openmoviedb/kinopoiskdev_client";
import axios from "axios";
import viteLogo from "/vite.svg";

type KinopoiskState = {
    film: {
        id: number,
        name: string,
        img: string,
        year: number,
        description: string,
        genres: [],
        counter: [],
        rating: string,
        id: number,
        video: []
    }
    filter: {
        year: string,
        'genres.name': [],
        'countries.name': [],
        'rating.kp': string,
        type:string,
        limit: number
    },
    filterDefault: {
        limit: number,
        page: number
    },

    favorites: [],
    countries: [],
    genres: [],
    year:[],
    rating: [],
    isLoading: boolean,
    error: string,
    errorCountries: string,
    errorGenres: string
}



const initialState: KinopoiskState = {
    film: {
        id: 0,
        name: '',
        img: '',
        year: 0,
        description: '',
        genres: [],
        counter: [],
        rating: '',
        video: []
    },
    filter: {
        year: '',
        'genres.name': [],
        'countries.name': [],
        'rating.kp': '',
        type: '',
        limit: 99999999
    },

    favorites: [],
    countries: [],
    genres: [],
    year: [
        '2023',
        '2020-2024',
        '2015-2020',
        '2000-2015',
        '1800-2000'
    ],
    rating: [
        '8-10',
        '6-8',
        '2-6',
        '0',
    ],
    filterDefault: {
        limit: 99999999,
        page: 20
    },
    isLoading: false,
    error: '',
    errorCountries: '',
    errorGenres: ''
}


export const fetchKinopoisk = createAsyncThunk(
    'kinopoisk/fetchKinopoisk',
    async function ({filterGet}, {rejectWithValue}) {
        try {
            const kinopoiskInstance = new KinopoiskDev('1P3CAMQ-ACWMBMM-H0EWE3T-6H5SCMP');
            const response = await kinopoiskInstance.movie.getByFilters(filterGet);
            if (response.data.docs.length === 0) {
                throw new Error('reject');
            }

            return response.data?.docs[Math.floor(Math.random() * response.data.docs.length)];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchKinopoiskDataCountries = createAsyncThunk(
    'kinopoisk/fetchKinopoiskDataCountries',
    async function (_, {rejectWithValue}) {
        try {
            const response = new KinopoiskDev('1P3CAMQ-ACWMBMM-H0EWE3T-6H5SCMP')<IKinopoisk>;
            const data = await response.movie.getPossibleValuesByField('countries.name');

            if (data.statusCode !== 200) {
                throw new Error('rejectCountries');
            }

            return data.data
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

export const fetchKinopoiskDataGenres = createAsyncThunk(
    'kinopoisk/fetchKinopoiskDataGenres',
    async function (_, {rejectWithValue}) {
        try {
            const response = new KinopoiskDev('1P3CAMQ-ACWMBMM-H0EWE3T-6H5SCM')<IKinopoisk>;


            if (!response.ok) {
                console.log(!response.ok)
                throw new Error('rejectGenres');
            }

            const data = await response.movie.getPossibleValuesByField('genres.name');
            return data.data
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)



const helperError = (state, action) => {
    switch (action.payload) {
        case 'reject':
            state.error = action.payload
            break
        case 'rejectGenres':
            state.errorGenres = action.payload
            break
        case 'rejectCountries':
            state.errorCountries = action.payload
            break
    }

    state.isLoading = false
}



export  const kinopoiskSlice = createSlice( {
    name: 'kinopoisk',
    initialState,
    reducers: {
        kinoposkFetching(state) {
            state.isLoading = true

        },
        kinoposkFetchingSuccess(state, action: PayloadAction<IKinopoisk>) {
            state.isLoading = false;
            state.error = '';
            state.film = action.payload
        },
        kinoposkFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        },

        favoritesArray (state,action) {
            state.favorites = [...state.favorites, action.payload]
        },
        filters(state, action) {
            switch (action.payload.type) {
                case 'years':
                    if (action.payload.value == 'all') {
                        state.filter.year = ''
                    }else {
                        state.filter.year = action.payload.value
                    }
                    break
                case 'rating.kp':
                    if (action.payload.value == 'all') {
                        state.filter['rating.kp'] = ''
                    }else {
                        state.filter['rating.kp'] = action.payload.value
                    }
                    break
                case 'countries.name':
                    if (action.payload.value == 'all') {
                        state.filter['countries.name'] = ''
                    }else {
                        state.filter['countries.name'] = action.payload.value
                    }

                    break
                case 'genres.name':

                    if (action.payload.value == 'all') {
                        state.filter['genres.name'] = ''
                    }else {
                        state.filter['genres.name'] = action.payload.value
                    }
                    break
                case 'type':
                    state.filter.type = action.payload.value
                    break
                default:
                    break
            }
        }
    },
    extraReducers: {
        [fetchKinopoisk.pending]: (state) => {state.isLoading = true},
        [fetchKinopoisk.fulfilled]: (state,action) => {
            if (state.error == 'reject') {
                state.error = ''
            }

            state.isLoading = false
            state.film.img = action.payload.poster.url
            state.film.name = action.payload.name
            state.film.year = action.payload.year
            state.film.id = action.payload.id
            state.film.description = action.payload.description
            state.film.genres = action.payload.genres
            state.film.counter = action.payload.countries
            state.film.rating = action.payload.rating.kp
            state.film.id = action.payload.id
            state.film.video = action.payload.watchability.items
        },
        [fetchKinopoisk.rejected]: helperError,

        [fetchKinopoiskDataCountries.fulfilled]: (state, action) => {
            if (state.errorCountries == 'rejectCountries') {
                state.errorCountries = ''
            }
            const countryNames = action.payload.map(country => country.name);
            state.countries = countryNames
        },
        [fetchKinopoiskDataCountries.rejected]: helperError,
        [fetchKinopoiskDataGenres.fulfilled]: (state, action) => {
            if (state.errorGenres == 'rejectGenres') {
                state.errorGenres = ''
            }
            const genresNames = action.payload.map(country => country.name);
            state.genres = genresNames
        },
        [fetchKinopoiskDataGenres.rejected]: helperError,

    }
})

export default kinopoiskSlice.reducer
export const {filters, favoritesArray} = kinopoiskSlice.actions