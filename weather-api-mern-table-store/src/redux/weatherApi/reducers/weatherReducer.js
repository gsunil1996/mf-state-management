import { GET_WEATHER_FAILURE, GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS } from "../actionTypes/weatherActionTypes"

const weatherInitialState = {
    getWeatherInitData: {
        data: [],
        isLoading: false,
        isError: false,
        error: "",
        isSuccess: false,
    }
}

export const weatherReducer = (state = weatherInitialState, action) => {
    switch (action.type) {
        case GET_WEATHER_REQUEST:
            return {
                ...state,
                getWeatherInitData: {
                    ...state.getWeatherInitData,
                    data: [],
                    isLoading: true,
                    isError: false,
                    error: "",
                    isSuccess: false,
                }
            }

        case GET_WEATHER_SUCCESS:
            return {
                ...state,
                getWeatherInitData: {
                    ...state.getWeatherInitData,
                    loading: false,
                    data: action.payload,
                    isSuccess: true,
                }
            }

        case GET_WEATHER_FAILURE:
            return {
                ...state,
                getWeatherInitData: {
                    ...state.getWeatherInitData,
                    loading: false,
                    isError: true,
                    error: action.payload,
                }
            }
        default:
            return state
    }
}