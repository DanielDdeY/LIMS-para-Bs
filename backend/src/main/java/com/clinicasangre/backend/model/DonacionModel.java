package com.clinicasangre.backend.model;

import com.clinicasangre.backend.model.enums.TipoDonacion;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "donaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonacionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 16)
    private String dinIsbt128; // DIN ISBT 128

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donante_id", nullable = false)
    private DonanteModel donante;

    @Column(nullable = false)
    private LocalDateTime fechaExtraccion;

    private Integer volumenMl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoDonacion tipoDonacion;

    @Builder.Default
    private Boolean tamizajeAprobado = false;
}