const MainInfo = ({ data }) => (
    <div>
        <h1>{data.name.common}</h1>
        <div>
            <div>
                Capital: {data.capital.join(', ')}
            </div>
            <div>
                Area: {data.area}
            </div>
        </div>
    </div>
)

const Languages = ({ languages }) => (
    <div>
        <h2>Languages</h2>
        <ul>
            {Object.entries(languages)
                .map(([key, value]) => 
                    <li key={key}>{value}</li>
                )
            }
        </ul>
    </div>
)

const Flag = ({ data }) => {
    const style = {
        'boxShadow': '5px 5px 15px 15px rgba(0, 0, 0, 0.1)',
        'height': '150px'
    }

    return (
        <div>
            <img
                src={data.flags.png}
                alt={`Flag of ${data.name.common}`}
                style={style} 
            />
        </div>
    )
}

const Weather = ({ weatherData, countryData }) => {
    if (weatherData !== null && weatherData.sys.country === countryData.cca2) {
        return (
            <div>
                <h2>Weather in {countryData.capital}</h2>
                <p>
                    Temperature: {(weatherData.main.temp - 272.15).toFixed(2)} Celsius
                </p>
                <img 
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                />
                <p>
                    Wind: {weatherData.wind.speed} m/s
                </p>
            </div>
        )
    }

    return (
        <div>
            Loading...
        </div>
    )
}

const CountryInfo = ({ countryData, weatherData }) => (
    <div>
        <MainInfo data={countryData} />
        <Languages languages={countryData.languages} />
        <Flag data={countryData} />
        <Weather weatherData={weatherData} countryData={countryData} />
    </div>
)

export default CountryInfo