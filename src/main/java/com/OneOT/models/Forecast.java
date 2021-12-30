package com.OneOT.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Forecast {
    private LocalDate date;
    private Night night;
    private Day day;
}
