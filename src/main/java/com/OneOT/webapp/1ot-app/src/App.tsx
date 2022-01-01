import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Accordion, Col, Container, Row, Spinner} from "react-bootstrap";

class App extends Component {
    state = {
        forecasts: [],
        isLoading: true
    };

    async componentDidMount() {
        const response = await fetch('/forecasts');
        const body = await response.json();
        this.setState({forecasts: body, isLoading: false});
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>)
        } else {
            const forecasts = this.state.forecasts as any[];
            return (
                <div className="App">
                    <header className="text-uppercase text-center">
                        <h1>Estonian Forecast</h1>
                    </header>
                    <div>
                        <Container>
                            {forecasts.map(forecast => {
                                    return (
                                        <div key={forecast.date}>
                                            <Row>
                                                <h2 className="dateField">{forecast['date']}</h2>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h3 className="dayTime">DAY</h3>
                                                    <div
                                                        className="textFieldSmallTitle">{forecast.day.phenomenon}</div>
                                                    <Row className="justify-content-md-center">
                                                        <Col className="temperatureColMin" md="auto">
                                                            <div className="tempTagMin">MIN</div>
                                                            <div className="tempValueMin">{forecast.day.tempMin}°C</div>
                                                        </Col>
                                                        <Col className="temperatureColMax" md="auto">
                                                            <div className="tempTagMax">MAX</div>
                                                            <div className="tempValueMax">{forecast.day.tempMax}°C</div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                    <h3 className="dayTime">NIGHT</h3>
                                                    <div
                                                        className="textFieldSmallTitle">{forecast.night.phenomenon}</div>
                                                    <Row className="justify-content-md-center">
                                                        <Col className="temperatureColMin" md="auto">
                                                            <div className="tempTagMin">MIN</div>
                                                            <div className="tempValueMin">{forecast.night.tempMin}°C</div>
                                                        </Col>
                                                        <Col className="temperatureColMax" md="auto">
                                                            <div className="tempTagMax">MAX</div>
                                                            <div className="tempValueMax">{forecast.night.tempMax}°C</div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Accordion>
                                                        <Accordion.Item eventKey="dayDescription">
                                                            <Accordion.Header>
                                                                <div className="textFieldSmallTitle">Description</div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div
                                                                    className="textFieldBody">{forecast.day.description}</div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="daySea">
                                                            <Accordion.Header>
                                                                <div className="textFieldSmallTitle">Sea</div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="textFieldBody">{forecast.day.sea}</div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="dayPeipsi">
                                                            <Accordion.Header>
                                                                <div className="textFieldSmallTitle">Peipsi</div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="textFieldBody">{forecast.day.peipsi}</div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                                <Col>
                                                    <Accordion>
                                                        <Accordion.Item eventKey="nightDescription">
                                                            <Accordion.Header>
                                                                <div className="textFieldSmallTitle">Description</div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div
                                                                    className="textFieldBody">{forecast.night.description}</div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="nightSea">
                                                            <Accordion.Header>
                                                                <div className="textFieldSmallTitle">Sea</div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="textFieldBody">{forecast.night.sea}</div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="nightPeipsi">
                                                            <Accordion.Header>
                                                                <div className="textFieldSmallTitle">Peipsi</div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="textFieldBody">{forecast.night.peipsi}</div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                            </Row>
                                            {
                                                forecast.day.placeList.map((place: any) => {
                                                    const placeName = place.name;
                                                    return (
                                                        <>
                                                            <h4 className="placeName">{place.name}</h4>
                                                            <Row className="placeRow">
                                                                {
                                                                    forecast.day.placeList.map((place: any) => {
                                                                        if (placeName === place.name) {
                                                                            return (
                                                                                <>
                                                                                    <Col className="placeColumn">
                                                                                        <h3 className="dayTimeSmall">DAY</h3>
                                                                                        <div
                                                                                            className="textFieldSmallTitle">{place.phenomenon}
                                                                                        </div>
                                                                                        <div
                                                                                            className="placeTempMax">MAX: {place.temp}°C
                                                                                        </div>
                                                                                    </Col>
                                                                                </>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                                {
                                                                    forecast.night.placeList.map((place: any) => {
                                                                        if (placeName === place.name) {
                                                                            return (
                                                                                <>
                                                                                    <Col className="placeColumn">
                                                                                        <h3 className="dayTimeSmall">NIGHT</h3>
                                                                                        <div
                                                                                            className="textFieldSmallTitle">
                                                                                            {place.phenomenon}
                                                                                        </div>
                                                                                        <div className="placeTempMin">
                                                                                            MIN: {place.temp}°C
                                                                                        </div>
                                                                                    </Col>
                                                                                </>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </Row>
                                                        </>
                                                    )
                                                })
                                            }
                                            <Row className="justify-content-md-center">
                                                {
                                                    forecast.day.windList.map((wind: any) => {
                                                        const placeName = wind.name;
                                                        return (
                                                            <>
                                                                <Col md="auto">
                                                                    <h4 className="windPlaceName">{placeName}</h4>
                                                                    <Col md="auto">
                                                                        {
                                                                            forecast.day.windList.map((wind: any) => {
                                                                                if (placeName === wind.name) {
                                                                                    return (
                                                                                        <>
                                                                                            <h3 className="dayTimeSmall">DAY</h3>
                                                                                            <div
                                                                                                className="textFieldSmallTitle">
                                                                                                {wind.direction}
                                                                                            </div>
                                                                                            <div>MIN: {wind.speedMin} m/s</div>
                                                                                            <div>MAX: {wind.speedMax} m/s</div>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            })
                                                                        }
                                                                    </Col>
                                                                    <Col md="auto">
                                                                        {
                                                                            forecast.night.windList.map((wind: any) => {
                                                                                if (placeName === wind.name) {
                                                                                    return (
                                                                                        <>
                                                                                            <h3 className="dayTimeSmall">NIGHT</h3>
                                                                                            <div
                                                                                                className="textFieldSmallTitle">
                                                                                                {wind.direction}
                                                                                            </div>
                                                                                            <div>MIN: {wind.speedMin} m/s</div>
                                                                                            <div>MAX: {wind.speedMax} m/s</div>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            })
                                                                        }
                                                                    </Col>
                                                                </Col>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </div>
                                    )
                                }
                            )}
                        </Container>
                    </div>
                    <footer>
                        <div className="p-3 mb-2 bg-light text-dark"> All readings taken from <a
                            className="text-info"
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
}

export default App;