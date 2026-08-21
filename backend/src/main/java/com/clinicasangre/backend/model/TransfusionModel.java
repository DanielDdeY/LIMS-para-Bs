package com.clinicasangre.backend.model;

import com.clinicasangre.backend.model.enums.ResultadoPruebaCruzada;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transfusiones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransfusionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitud_id", nullable = false)
    private SolicitudModel solicitud;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hemocomponente_id", nullable = false)
    private HemocomponenteModel hemocomponente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id", nullable = false)
    private PacienteModel paciente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tecnologo_id")
    private UsuarioModel tecnologo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medico_id")
    private UsuarioModel medico;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ResultadoPruebaCruzada resultadoPruebaCruzada;

    private LocalDateTime fechaTransfusion;

    @Builder.Default
    private Boolean reaccionAdversa = false;

    @Column(columnDefinition = "TEXT")
    private String detallesReaccion;

    @Column(length = 10)
    private String diagnosticoCie10;
}