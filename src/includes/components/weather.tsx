import React, { useState, useEffect } from "react";
import { getWeather } from "../../api";

import CloudSVG from "../../icons/cloudy.svg";
import ClearDaySVG from "../../icons/clear-day.svg";
import RainSVG from "../../icons/rain.svg";

export function Weather(props: any){
	let { data } = props;
	const [ weather, setWeather ] = useState<any>();

	useEffect(() => {
		getWeatherData();
	},[])

	async function getWeatherData(){
		let weather_data = await getWeather(data.options.lat, data.options.lon);
		setWeather(weather_data.data);
	}

	if (!weather) {
		return null
	}

	return (
		<div className="weather-component-wrapper">
			<div className="header-wrap">
				<WeatherIcon condition={weather.condition} />
				<div className="temperature-wrap">
					<p className="temperature">{weather.temperature}°{weather.unit}</p>
					<p className="condition">{weather.conditionName}</p>
				</div>
				<p className="location">{weather.location}</p>
			</div>
			<div className="footer-wrap">
				{
					weather.upcomming.map(( weath: any, i: any) => {
						return (
							<div key={i} className="upcoming-box-wrap">
								<WeatherIcon condition={weath.condition} />
								<p className="upcoming-day">{weath.day}</p>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}


function WeatherIcon(props: any){
	let { condition } = props;
	if (condition === "cloudy") {
		return <img src={CloudSVG} alt="cloudy icon" />
	} else if (condition === "rain") {
		return <img src={RainSVG} alt="rain icon" />
	} else {
		return <img src={ClearDaySVG} alt="clear day icon" />
	}
}







