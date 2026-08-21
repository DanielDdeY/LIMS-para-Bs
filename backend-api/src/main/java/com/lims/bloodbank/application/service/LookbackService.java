package com.lims.bloodbank.application.service;

import com.lims.bloodbank.domain.model.Donante;
import com.lims.bloodbank.domain.model.Hemocomponente;
import com.lims.bloodbank.domain.repository.DonanteRepository;
import com.lims.bloodbank.domain.repository.HemocomponenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LookbackService {
    @Autowired
    private HemocomponenteRepository hemoRepo;
    
    public void iniciarRastreoInverso(Long hemocomponenteInfectadoId) {
        Hemocomponente infectado = hemoRepo.findById(hemocomponenteInfectadoId).orElseThrow();
        Donante donante = infectado.getDonante();
        // En un caso real buscaríamos por query personalizado
        List<Hemocomponente> todos = hemoRepo.findAll();
        for (Hemocomponente h : todos) {
            if (h.getDonante().getId().equals(donante.getId()) && !h.getEstado().equals("DESCARTADO")) {
                h.setEstado("CUARENTENA_LOOKBACK");
                hemoRepo.save(h);
                // Aquí notificaríamos por WebSocket al Frontend
            }
        }
    }
}
