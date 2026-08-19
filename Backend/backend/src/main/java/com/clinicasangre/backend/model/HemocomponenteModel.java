package com.clinicasangre.backend.model;

import com.clinicasangre.backend.model.enums.*;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hemocomponentes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HemocomponenteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donacion_id", nullable = false)
    private DonacionModel donacion;

    @Column(nullable = false, length = 8)
    private String codigoProductoIsbt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 35)
    private TipoHemocomponente tipoHemocomponente;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 5)
    private GrupoAbo grupoAbo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private FactorRh factorRh;

    @Enumerated(EnumType.STRING)
    @Column(length = 15)
    private VarianteRh varianteRh;

    @Embedded
    private FenotipoExtendidoModel fenotipoExtendido;

    @Builder.Default private Boolean esLeucoreducido = false;
    @Builder.Default private Boolean esIrradiado = false;
    @Builder.Default private Boolean esLavado = false;

    @Column(length = 20)
    private String estatusCmv;

    private Integer volumenMl;
    private LocalDateTime fechaExtraccion;
    private LocalDateTime fechaVencimiento;

    @Column(length = 50)
    private String ubicacionFisica;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoHemocomponente estado;

    @Builder.Default
    private Boolean disponibleParaIntercambio = false;
}