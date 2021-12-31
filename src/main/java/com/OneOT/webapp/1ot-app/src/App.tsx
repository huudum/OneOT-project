import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    state = {
        forecasts: []
    };

    async componentDidMount() {
        const response = await fetch('/forecasts');
        const body = await response.json();
        this.setState({forecasts: body});
    }

    render() {
        const forecasts = this.state.forecasts as any[];
        console.log(forecasts)
        return (
            <div className="App">
                <header className="text-uppercase text-center">
                    <h2>Forecasts</h2>
                </header>
                <body>
                    <div className="flex">
                        {forecasts.map(forecast => {
                                return (
                                    <>
                                        <h4 className="text-center">Date: {forecast['date']}</h4>
                                        <div className="float-left">
                                            <h3>DAY</h3>
                                            <div className="genericValue">{forecast.day.phenomenon}</div>
                                            <div className="tempValue">Minimum
                                                temperature {forecast.day.tempMin}°C
                                            </div>
                                            <div className="tempValue">Maximum
                                                temperature {forecast.day.tempMax}°C
                                            </div>
                                            <div className="textBox">{forecast.day.description}</div>
                                            <br/>
                                            <div className="textBox">{forecast.day.sea}</div>
                                            <br/>
                                            <div className="textBox">{forecast.day.peipsi}</div>
                                            <br/>
                                            <div className="placeList">
                                                {
                                                    forecast.day.placeList.map((place : any) => {
                                                        console.log(place)
                                                        return (
                                                            <>
                                                                <div>{place.name}</div>
                                                                <div>{place.phenomenon}</div>
                                                                <div>{place.temp}</div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="windList">
                                                {
                                                    forecast.day.windList.map((wind : any) => {
                                                        console.log(wind)
                                                        return (
                                                            <>
                                                                <div>{wind.name}</div>
                                                                <div>{wind.direction}</div>
                                                                <div>{wind.speedMin}</div>
                                                                <div>{wind.speedMax}</div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="float-right">
                                            <h3>NIGHT</h3>
                                            <div className="genericValue">{forecast.night.phenomenon}</div>
                                            <div className="tempValue">Minimum
                                                temperature {forecast.night.tempMin}°C
                                            </div>
                                            <div className="tempValue">Maximum
                                                temperature {forecast.night.tempMax}°C
                                            </div>
                                            <br/>
                                            <div className="textBox">{forecast.night.description}</div>
                                            <br/>
                                            <div className="textBox">{forecast.night.sea}</div>
                                            <br/>
                                            <div className="textBox">{forecast.night.peipsi}</div>
                                            <div className="placeList">
                                                {
                                                    forecast.day.placeList.map((place : any) => {
                                                        console.log(place)
                                                        return (
                                                            <>
                                                                <div>{place.name}</div>
                                                                <div>{place.phenomenon}</div>
                                                                <div>{place.temp}</div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="windList">
                                                {
                                                    forecast.day.windList.map((wind : any) => {
                                                        console.log(wind)
                                                        return (
                                                            <>
                                                                <div>{wind.name}</div>
                                                                <div>{wind.direction}</div>
                                                                <div>{wind.speedMin}</div>
                                                                <div>{wind.speedMax}</div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        )}
                    </div>
                </body>
                <footer>
                    <div className="fixed-bottom p-3 mb-2 bg-light text-dark"> All readings taken from <a  className="text-info"
                            href="https://www.ilmateenistus.ee/teenused/ilmainfo/eesti-prognoos-xml/">Riigiteenistus
                            website
                            forecast API.
                        </a>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;