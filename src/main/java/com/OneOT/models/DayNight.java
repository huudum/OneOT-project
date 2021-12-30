package com.OneOT.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DayNight {
    private String phenomenon;
    private Integer tempMin;
    private Integer tempMax;
    private String description;

    private List<Place> placeList;
    private List<Wind> windList;
    private String sea;
    private String peipsi;
}
