package com.lims.bloodbank.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "donantes")
@Data
public class Donante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Datos Demográficos
    private String identificacion;
    private String nombres;
    private String apellidos;
    private String sexo;
    private LocalDate fechaNacimiento;
    private String direccion;
    private String telefono;
    private String correoElectronico;
    
    // Evaluación Clínica (Hospital Grande)
    private Double peso; // en kg
    private Double talla; // en cm
    private String presionArterial; // ej. 120/80
    private Double hemoglobina; // ej. 14.5
    private Double hematocrito;
    
    // Tipificación y Trazabilidad
    private String grupoSanguineo;
    private String factorRh;
    private LocalDateTime fechaHoraRegistro;
    private LocalDate ultimaDonacion;
    private Boolean aptoParaDonar;
    private String observacionesMedicas;
}
