package com.clinicasangre.backend.model;

import com.clinicasangre.backend.model.enums.MotivoDescarte;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "descartes_hemocomponentes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DescarteHemocomponenteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hemocomponente_id", nullable = false, unique = true)
    private HemocomponenteModel hemocomponente;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 35)
    private MotivoDescarte motivoDescarte;

    private LocalDateTime fechaEliminacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "responsable_id")
    private UsuarioModel responsable;

    @Column(length = 50)
    private String actaIncineracionCodigo;
}