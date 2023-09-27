import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getWeatherData } from "store/getWeatherDataRemote";

const WeatherApiPage = () => {
    const dispatch = useDispatch();

    const { getWeatherInitData: { data, isLoading, isError, error, isSuccess } } = useSelector((state) => state.getCityWeatherDetails);

    const [value, setValue] = useState("kurnool");


    useEffect(() => {
        dispatch(getWeatherData(value))
    }, [dispatch])

    console.log("test", data)
    return (
        <div>
            <h1>Weather Api</h1>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={() => dispatch(getWeatherData(value))} >Search</button>
            <br />
            <h2>City: {data?.name}</h2>
            <h2>Temperature: {data?.main?.temp}</h2>
        </div>
    )
}

export default WeatherApiPage