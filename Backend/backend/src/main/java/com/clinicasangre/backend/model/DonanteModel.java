package com.clinicasangre.backend.model;

import com.clinicasangre.backend.model.enums.FactorRh;
import com.clinicasangre.backend.model.enums.GrupoAbo;
import com.clinicasangre.backend.model.enums.VarianteRh;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "donantes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonanteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String tipoDoc;

    @Column(nullable = false, unique = true, length = 15)
    private String numDoc;

    @Column(nullable = false, length = 100)
    private String nombres;

    @Column(nullable = false, length = 100)
    private String apellidos;

    private LocalDate fechaNacimiento;

    @Column(length = 10)
    private String sexo;

    @Column(length = 6)
    private String ubigeo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 5)
    private GrupoAbo grupoAbo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private FactorRh factorRh;

    @Enumerated(EnumType.STRING)
    @Column(length = 15)
    private VarianteRh varianteRh;

    @Builder.Default
    private Boolean estadoDiferido = false;

    private LocalDate fechaDesbloqueo;

    @Builder.Default
    private Boolean esOcupacionRiesgo = false;
}