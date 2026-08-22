package com.lims.bloodbank.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "hemocomponentes")
@Data
public class Hemocomponente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigoIsbt;
    private String tipoComponente;
    private Double volumenMl;
    private String origen;
    private String ubicacionFisica;
    private LocalDate fechaExtraccion;
    private LocalDate fechaCaducidad;
    private String estado; // CUARENTENA, LIBERADO, DESCARTADO, TRANSFUNDIDO

    // --- NUEVOS CAMPOS CLÍNICOS ---
    private Boolean leucorreducido;
    private Boolean irradiado;
    private String anticoagulante; // CPDA-1, SAGM, etc.

    @ManyToOne
    @JoinColumn(name = "donante_id")
    private Donante donante;
}
