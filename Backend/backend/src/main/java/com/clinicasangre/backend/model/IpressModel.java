package com.clinicasangre.backend.model;

import com.clinicasangre.backend.model.enums.TipoBancoSangre;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ipress_establecimientos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IpressModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 8)
    private String codigoRenipress;

    @Column(nullable = false, length = 150)
    private String nombreEstablecimiento;

    @Column(length = 20)
    private String categoriaIpress;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoBancoSangre tipoBancoSangre;

    @Column(length = 50)
    private String numeroAutorizacionSanitaria;
}