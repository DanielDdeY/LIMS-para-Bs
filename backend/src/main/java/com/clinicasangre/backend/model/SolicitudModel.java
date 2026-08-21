package com.clinicasangre.backend.model;

import com.clinicasangre.backend.model.enums.EstadoSolicitud;
import com.clinicasangre.backend.model.enums.PrioridadSolicitud;
import com.clinicasangre.backend.model.enums.TipoHemocomponente;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "solicitudes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolicitudModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String codigoSolicitud;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id", nullable = false)
    private PacienteModel paciente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medico_id", nullable = false)
    private UsuarioModel medico;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 35)
    private TipoHemocomponente tipoHemocomponente;

    @Column(nullable = false)
    private Integer unidadesSolicitadas;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PrioridadSolicitud prioridad;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoSolicitud estado;

    @Column(columnDefinition = "TEXT")
    private String indicacionClinica;

    private LocalDateTime fechaSolicitud;
}