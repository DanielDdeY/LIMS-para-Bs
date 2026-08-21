package com.clinicasangre.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "auditoria_movimientos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditoriaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hemocomponente_id")
    private HemocomponenteModel hemocomponente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioModel usuario;

    @Column(nullable = false, length = 50)
    private String accion;

    private LocalDateTime fecha;

    @Column(columnDefinition = "TEXT")
    private String detalleJson;
}