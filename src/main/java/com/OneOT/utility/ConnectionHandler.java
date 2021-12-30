package com.OneOT.utility;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;

@Component
public class ConnectionHandler {
    public static URLConnection getConnection() {
        String forecastApiUrlString = "https://www.ilmateenistus.ee/ilma_andmed/xml/forecast.php?lang=eng";
        URLConnection connection = null;
        try {
            connection = new URL(forecastApiUrlString).openConnection();
            connection.setRequestProperty("Accept", "application/xml");
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        return connection;
    }
}
