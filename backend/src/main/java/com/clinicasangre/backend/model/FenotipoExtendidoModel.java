package com.clinicasangre.backend.model;

import com.clinicasangre.backend.model.enums.FenotipoEstatus;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FenotipoExtendidoModel {

    @Enumerated(EnumType.STRING)
    private FenotipoEstatus fenotipoC;

    @Enumerated(EnumType.STRING)
    private FenotipoEstatus fenotipoCMin; // Antígeno c

    @Enumerated(EnumType.STRING)
    private FenotipoEstatus fenotipoE;

    @Enumerated(EnumType.STRING)
    private FenotipoEstatus fenotipoEMin; // Antígeno e

    @Enumerated(EnumType.STRING)
    private FenotipoEstatus antigenoKell; // Antígeno K1
}
