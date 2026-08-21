package com.clinicasangre.backend.model;

import com.clinicasangre.backend.model.enums.EstadoIntercambio;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "solicitudes_intercambio")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolicitudIntercambioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ipress_solicitante_id", nullable = false)
    private IpressModel ipressSolicitante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ipress_proveedora_id", nullable = false)
    private IpressModel ipressProveedora;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hemocomponente_id", nullable = false)
    private HemocomponenteModel hemocomponente;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoIntercambio estado;

    private Double temperaturaCadenaFrio;

    @Column(length = 100)
    private String responsableTransporte;

    private LocalDateTime fechaSolicitud;
    private LocalDateTime fechaRespuesta;
}