package com.OneOT.controller;

import com.OneOT.dao.ForecastDao;
import com.OneOT.models.Forecast;
import com.OneOT.models.Place;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ForecastController {
    private final ForecastDao forecastsDao;

    public ForecastController(ForecastDao forecastsDao) {
        this.forecastsDao = forecastsDao;
    }

    @GetMapping("")
    public Place getPlace() {
        return new Place("City","Misty",-3);
    }

    @GetMapping("/forecasts")
    public List<Forecast> getForecasts() {
        return forecastsDao.getForecasts();
    }
}
