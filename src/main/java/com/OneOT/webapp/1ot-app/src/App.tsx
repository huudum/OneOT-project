import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Accordion, Col, Container, Row} from "react-bootstrap";

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
        return (
            <div className="App">
                <header className="text-uppercase text-center">
                    <h1>Forecasts</h1>
                </header>
                <body>
                <Container>
                    {forecasts.map(forecast => {
                            return (
                                <>
                                    <Row>
                                        <h2 className="text-center">{forecast['date']}</h2>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3 className="dayTime">DAY</h3>
                                            <div
                                                className="phenomenonText">{forecast.day.phenomenon}</div>
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
                                                className="phenomenonText">{forecast.night.phenomenon}</div>
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
                                                        <div className="text-body">Description</div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <div>{forecast.day.description}</div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="daySea">
                                                    <Accordion.Header>
                                                        <div className="text-body">Sea</div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <div>{forecast.day.sea}</div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="dayPeipsi">
                                                    <Accordion.Header>
                                                        <div className="text-body">Peipsi</div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <div>{forecast.day.peipsi}</div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Col>
                                        <Col>
                                            <Accordion>
                                                <Accordion.Item eventKey="nightDescription">
                                                    <Accordion.Header>
                                                        Description
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <div>{forecast.night.description}</div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="nightSea">
                                                    <Accordion.Header>
                                                        Sea
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <div>{forecast.night.sea}</div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="nightPeipsi">
                                                    <Accordion.Header>
                                                        Peipsi
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <div>{forecast.night.peipsi}</div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3 className="text-center">DAY</h3>
                                        </Col>
                                        <Col>
                                            <h3 className="text-center">NIGHT</h3>
                                        </Col>
                                    </Row>
                                    {
                                        forecast.day.placeList.map((place: any) => {
                                            const placeName = place.name;
                                            return (
                                                <>
                                                    <h4 className="text-center">{place.name}</h4>
                                                    <Row>
                                                        <Col>
                                                            {
                                                                forecast.day.placeList.map((place: any) => {
                                                                    if (placeName === place.name) {
                                                                        return (
                                                                            <>
                                                                                <div
                                                                                    className="justify-content-right">{place.phenomenon}</div>
                                                                                <div
                                                                                    className="justify-content-right">{place.temp}°C
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </Col>
                                                        <Col>
                                                            {
                                                                forecast.night.placeList.map((place: any) => {
                                                                    if (placeName === place.name) {
                                                                        return (
                                                                            <>
                                                                                <div
                                                                                    className="justify-content-left">{place.phenomenon}</div>
                                                                                <div
                                                                                    className="justify-content-left">{place.temp}°C
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </Col>
                                                    </Row>
                                                </>
                                            )
                                        })
                                    }
                                    {
                                        forecast.day.windList.map((wind: any) => {
                                            const placeName = wind.name;
                                            return (
                                                <>
                                                    <h4 className="text-center">{placeName}</h4>
                                                    <Row className="justify-content-md-center">
                                                        <Col md="auto">
                                                            {
                                                                forecast.day.windList.map((wind: any) => {
                                                                    if (placeName === wind.name) {
                                                                        return (
                                                                            <>
                                                                                <div>{wind.direction}</div>
                                                                                <div>{wind.speedMin} m/s</div>
                                                                                <div>{wind.speedMax} m/s</div>
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
                                                                                <div>{wind.direction}</div>
                                                                                <div>{wind.speedMin} m/s</div>
                                                                                <div>{wind.speedMax} m/s</div>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </Col>
                                                    </Row>
                                                </>
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                    )}
                </Container>
                </body>
                <footer>
                    <div className="fixed-bottom p-3 mb-2 bg-light text-dark"> All readings taken from <a
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

export default App;