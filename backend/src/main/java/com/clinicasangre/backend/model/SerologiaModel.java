package com.clinicasangre.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "serologias")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SerologiaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donacion_id", nullable = false, unique = true)
    private DonacionModel donacion;

    @Column(nullable = false) private Boolean vih;
    @Column(nullable = false) private Boolean hepatitisBHbsag;
    @Column(nullable = false) private Boolean hepatitisBAntihbc;
    @Column(nullable = false) private Boolean hepatitisC;
    @Column(nullable = false) private Boolean htlv;
    @Column(nullable = false) private Boolean chagas;
    @Column(nullable = false) private Boolean sifilis;

    private LocalDateTime fechaEvaluacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tecnologo_id")
    private UsuarioModel tecnologo;
}