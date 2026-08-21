package com.clinicasangre.backend.model;

import com.clinicasangre.backend.model.enums.EstadoSincronizacion;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sincronizacion_hemored")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SincronizacionHemoredModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
    private String tipoEntidad;

    @Column(nullable = false)
    private Long entidadId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoSincronizacion estadoSincronizacion;

    @Column(length = 10)
    private String codigoRespuestaMinsa;

    @Column(columnDefinition = "TEXT")
    private String mensajeRespuesta;

    private LocalDateTime fechaIntento;
}