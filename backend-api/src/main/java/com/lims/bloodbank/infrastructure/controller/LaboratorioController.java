package com.lims.bloodbank.infrastructure.controller;

import com.lims.bloodbank.domain.model.Serologia;
import com.lims.bloodbank.domain.model.Hemocomponente;
import com.lims.bloodbank.domain.repository.SerologiaRepository;
import com.lims.bloodbank.domain.repository.HemocomponenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/laboratorio")
@CrossOrigin(origins = "*")
public class LaboratorioController {

    @Autowired
    private SerologiaRepository serologiaRepository;

    @Autowired
    private HemocomponenteRepository hemocomponenteRepository;

    @GetMapping("/pendientes")
    public List<Hemocomponente> obtenerPendientes() {
        // En un caso real usaríamos una query personalizada, pero filtramos por estado:
        return hemocomponenteRepository.findAll().stream()
                .filter(h -> "CUARENTENA".equals(h.getEstado()))
                .toList();
    }

    @PostMapping("/procesar")
    public Serologia procesarMuestra(@RequestBody Serologia serologia) {
        serologia.setFechaPrueba(LocalDate.now());
        
        // Determinar si la bolsa es apta
        boolean esInfectado = (serologia.getVihPositivo() != null && serologia.getVihPositivo()) ||
                              (serologia.getHepatitisBPositivo() != null && serologia.getHepatitisBPositivo()) ||
                              (serologia.getHepatitisCPositivo() != null && serologia.getHepatitisCPositivo()) ||
                              (serologia.getSifilisPositivo() != null && serologia.getSifilisPositivo()) ||
                              (serologia.getChagasPositivo() != null && serologia.getChagasPositivo());

        if (serologia.getHemocomponente() != null && serologia.getHemocomponente().getId() != null) {
            Hemocomponente hemo = hemocomponenteRepository.findById(serologia.getHemocomponente().getId())
                    .orElseThrow(() -> new RuntimeException("Hemocomponente no encontrado"));
            
            if (esInfectado) {
                hemo.setEstado("DESCARTADO");
            } else {
                hemo.setEstado("LIBERADO");
            }
            hemocomponenteRepository.save(hemo);
        }
        
        return serologiaRepository.save(serologia);
    }
}
