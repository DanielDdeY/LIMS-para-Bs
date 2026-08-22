package com.lims.bloodbank.infrastructure.controller;

import com.lims.bloodbank.domain.model.Transfusion;
import com.lims.bloodbank.domain.repository.TransfusionRepository;
import com.lims.bloodbank.domain.repository.HemocomponenteRepository;
import com.lims.bloodbank.domain.model.Hemocomponente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/transfusiones")
@CrossOrigin(origins = "*")
public class TransfusionController {

    @Autowired
    private TransfusionRepository transfusionRepository;

    @Autowired
    private HemocomponenteRepository hemocomponenteRepository;

    @GetMapping
    public List<Transfusion> obtenerTodas() {
        return transfusionRepository.findAll();
    }

    @PostMapping
    public Transfusion registrarSalida(@RequestBody Transfusion transfusion) {
        if (transfusion.getHemocomponente() != null && transfusion.getHemocomponente().getId() != null) {
            Hemocomponente hemo = hemocomponenteRepository.findById(transfusion.getHemocomponente().getId())
                .orElseThrow(() -> new RuntimeException("Hemocomponente no encontrado"));
            
            if (!"LIBERADO".equals(hemo.getEstado())) {
                throw new RuntimeException("El hemocomponente no está libre para transfusión");
            }
            
            hemo.setEstado("TRANSFUNDIDO");
            hemocomponenteRepository.save(hemo);
        }
        
        transfusion.setFechaHoraInicio(LocalDateTime.now());
        transfusion.setEstadoTransfusion("EN CURSO");
        return transfusionRepository.save(transfusion);
    }
}
