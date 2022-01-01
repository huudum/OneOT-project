package com.OneOT.utility;

import com.OneOT.models.*;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static com.OneOT.utility.ConnectionHandler.getConnection;

@Component
public class XmlHandler {
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static List<Forecast> getForecastsFromApi(Document document) {
        ArrayList<Forecast> forecastArrayList = new ArrayList<>();
        NodeList nodeList = document.getElementsByTagName("forecast");

        for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);
            Forecast forecast = new Forecast();
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element element = (Element) node;

                NodeList nodeListNight = element.getElementsByTagName("night").item(0).getChildNodes();
                NodeList nodeListDay = element.getElementsByTagName("day").item(0).getChildNodes();
                forecast.setDay(parseDay(nodeListDay));
                forecast.setNight(parseNight(nodeListNight));

                forecast.setDate(LocalDate.parse(element.getAttribute("date"), formatter));
                forecastArrayList.add(forecast);
            }
        }
        return forecastArrayList;
    }

    private static DayNight parseDayNight(NodeList list) {
        DayNight dayOrNight = new DayNight();
        ArrayList<Place> placeArrayList = new ArrayList<>();
        ArrayList<Wind> windArrayList = new ArrayList<>();

        for (int i = 0; i < list.getLength(); i++) {
            Node node = list.item(i);
            if (node instanceof Element element) {
                switch (element.getTagName()) {
                    case "phenomenon" -> dayOrNight.setPhenomenon(element.getTextContent());
                    case "tempmin" -> dayOrNight.setTempMin(Integer.parseInt(element.getTextContent()));
                    case "tempmax" -> dayOrNight.setTempMax(Integer.parseInt(element.getTextContent()));
                    case "text" -> dayOrNight.setDescription(element.getTextContent());
                    case "place" -> placeArrayList.add(getPlace(element));
                    case "wind" -> windArrayList.add(getWind(element));
                    case "sea" -> dayOrNight.setSea(element.getTextContent());
                    case "peipsi" -> dayOrNight.setPeipsi(element.getTextContent());
                }
            }
        }

        dayOrNight.setPlaceList(placeArrayList);
        dayOrNight.setWindList(windArrayList);

        return dayOrNight;
    }

    private static Place getPlace(Element el) {
        Place place = new Place();

        place.setPhenomenon(el.getElementsByTagName("phenomenon").item(0).getTextContent());
        place.setName(el.getElementsByTagName("name").item(0).getTextContent());
        if (el.getElementsByTagName("tempmin").item(0) == null) {
            place.setTemp(Integer.parseInt(el.getElementsByTagName("tempmax").item(0).getTextContent()));
        } else {
            place.setTemp(Integer.parseInt(el.getElementsByTagName("tempmin").item(0).getTextContent()));
        }

        return place;
    }

    private static Wind getWind(Element el) {
        Wind wind = new Wind();
        wind.setName(el.getElementsByTagName("name").item(0).getTextContent());
        wind.setDirection(el.getElementsByTagName("direction").item(0).getTextContent());
        wind.setSpeedMin(Integer.parseInt(el.getElementsByTagName("speedmin").item(0).getTextContent()));
        wind.setSpeedMax(Integer.parseInt(el.getElementsByTagName("speedmax").item(0).getTextContent()));
        wind.setGust(el.getElementsByTagName("gust").item(0).getTextContent());

        return wind;
    }


    private static Night parseNight(NodeList list) {
        Night night = new Night();
        DayNight parse = parseDayNight(list);

        night.setPhenomenon(parse.getPhenomenon());
        night.setTempMax(parse.getTempMax());
        night.setTempMin(parse.getTempMin());

        night.setPlaceList(parse.getPlaceList());
        night.setWindList(parse.getWindList());

        night.setDescription(parse.getDescription() == null? "*Information was not available.*" : parse.getDescription());
        night.setSea(parse.getSea() == null ? "*Information was not available.*" : parse.getSea());
        night.setPeipsi(parse.getPeipsi() == null ? "*Information was not available.*" : parse.getPeipsi());

        return night;
    }

    private static Day parseDay(NodeList list) {
        DayNight universalClass = parseDayNight(list);

        Day day = new Day();
        day.setTempMax(universalClass.getTempMax());
        day.setTempMin(universalClass.getTempMin());
        day.setPhenomenon(universalClass.getPhenomenon());

        day.setWindList(universalClass.getWindList());
        day.setPlaceList(universalClass.getPlaceList());

        day.setSea(universalClass.getSea() == null ? "*Information was not available.*" : universalClass.getSea());
        day.setDescription(universalClass.getDescription() == null ? "*Information was not available.*" : universalClass.getDescription());
        day.setPeipsi(universalClass.getPeipsi() == null ? "*Information was not available.*" : universalClass.getPeipsi());


        return day;
    }

    public static Document getXmlDocument() {
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            dbf.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);

            DocumentBuilder documentBuilder = dbf.newDocumentBuilder();
            Document xmlForecast = documentBuilder.parse(getConnection().getInputStream());

            xmlForecast.getDocumentElement().normalize();

            return xmlForecast;

        } catch (MalformedURLException e) {
            System.out.println("URL is malformed.");
            e.printStackTrace();
        } catch (ParserConfigurationException e) {
            System.out.println("Unable to parse XML as document.");
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            System.out.println("Unable to parse connection as stream.");
            e.printStackTrace();
        }

        throw new RuntimeException("Unexpected error occurred.");
    }
}
