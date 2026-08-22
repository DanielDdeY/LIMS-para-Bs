package com.lims.bloodbank.infrastructure.controller;

import com.lims.bloodbank.domain.model.Hemocomponente;
import com.lims.bloodbank.domain.repository.HemocomponenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/hemocomponentes")
@CrossOrigin(origins = "*")
public class HemocomponenteController {

    @Autowired
    private HemocomponenteRepository hemocomponenteRepository;

    @GetMapping
    public List<Hemocomponente> obtenerTodos() {
        return hemocomponenteRepository.findAll();
    }

    @PostMapping
    public Hemocomponente registrarLote(@RequestBody Hemocomponente hemocomponente) {
        hemocomponente.setFechaExtraccion(LocalDate.now());
        if (hemocomponente.getFechaCaducidad() == null) {
            hemocomponente.setFechaCaducidad(LocalDate.now().plusDays(42));
        }
        hemocomponente.setEstado("CUARENTENA");
        return hemocomponenteRepository.save(hemocomponente);
    }
}
