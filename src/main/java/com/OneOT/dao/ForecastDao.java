package com.OneOT.dao;

import com.OneOT.models.Forecast;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.OneOT.utility.XmlHandler.getForecastsFromApi;
import static com.OneOT.utility.XmlHandler.getXmlDocument;

@Repository
public class ForecastDao {
    public List<Forecast> getForecasts() {
        return getForecastsFromApi(getXmlDocument());
    }
}
