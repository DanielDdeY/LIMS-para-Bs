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
    private String estado;
    private Double volumenMl;
    private String origen;
    private String ubicacionFisica;
    private LocalDate fechaExtraccion;
    private LocalDate fechaCaducidad;
    @ManyToOne
    @JoinColumn(name = "donante_id")
    private Donante donante;
}
