package com.lims.bloodbank.infrastructure.controller;

import com.lims.bloodbank.domain.model.Paciente;
import com.lims.bloodbank.domain.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "*")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    public List<Paciente> obtenerTodos() {
        return pacienteRepository.findAll();
    }

    @PostMapping
    public Paciente registrarPaciente(@RequestBody Paciente paciente) {
        return pacienteRepository.save(paciente);
    }
}
