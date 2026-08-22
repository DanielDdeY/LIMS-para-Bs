package com.lims.bloodbank.infrastructure.controller;

import com.lims.bloodbank.application.service.LookbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/hemovigilancia")
@CrossOrigin(origins = "*")
public class HemovigilanciaController {

    @Autowired
    private LookbackService lookbackService;

    @PostMapping("/lookback/{hemocomponenteId}")
    public Map<String, String> dispararLookback(@PathVariable Long hemocomponenteId) {
        lookbackService.iniciarRastreoInverso(hemocomponenteId);
        return Map.of("status", "success", "message", "Lookback iniciado, bolsas asociadas en cuarentena");
    }
}
