package com.lims.bloodbank.application.service;

import com.lims.bloodbank.domain.model.Hemocomponente;
import com.lims.bloodbank.domain.model.Paciente;
import org.springframework.stereotype.Service;

@Service
public class CompatibilidadService {
    public boolean esCompatible(Hemocomponente h, Paciente p) {
        return h.getDonante().getGrupoSanguineo().equals(p.getGrupoSanguineo()) &&
               h.getDonante().getFactorRh().equals(p.getFactorRh());
    }
}
