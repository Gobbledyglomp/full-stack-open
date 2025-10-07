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
        'boxShadow': '5px 5px 15px 15px rgba(0, 0, 0, 0.1)'
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

const CountryInfo = ({ data }) => {
    return (
        <div>
            <MainInfo data={data} />
            <Languages languages={data.languages} />
            <Flag data={data} />
        </div>
    )
}

export default CountryInfo