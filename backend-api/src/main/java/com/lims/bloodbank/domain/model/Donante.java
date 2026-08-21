package com.lims.bloodbank.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "donantes")
@Data
public class Donante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String identificacion;
    private String nombres;
    private String apellidos;
    private String grupoSanguineo;
    private String factorRh;
    private LocalDate fechaNacimiento;
    private Boolean aptoParaDonar;
}
