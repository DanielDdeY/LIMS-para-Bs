package com.lims.bloodbank.infrastructure.controller;

import com.lims.bloodbank.domain.model.Donante;
import com.lims.bloodbank.domain.repository.DonanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donantes")
@CrossOrigin(origins = "*")
public class DonanteController {
    @Autowired
    private DonanteRepository donanteRepository;

    @GetMapping
    public List<Donante> obtenerTodos() {
        return donanteRepository.findAll();
    }

    @PostMapping
    public Donante registrarDonante(@RequestBody Donante donante) {
        return donanteRepository.save(donante);
    }
}
