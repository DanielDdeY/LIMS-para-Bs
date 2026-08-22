package com.lims.bloodbank.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "transfusiones")
@Data
public class Transfusion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;
    @ManyToOne
    @JoinColumn(name = "hemocomponente_id")
    private Hemocomponente hemocomponente;
    private LocalDateTime fechaHoraInicio;
    private LocalDateTime fechaHoraFin;
    private String signosVitalesPre;
    private String signosVitalesPost;
    private String medicoResponsable;
    private String responsableAplicacion;
    private String areaDestino;
    private String estadoTransfusion;
    private String observaciones;
}
