package com.OneOT.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Wind {
    private String name;
    private String direction;
    private Integer speedMin;
    private Integer speedMax;
    private String gust;
}
