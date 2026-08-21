package com.lims.bloodbank.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "serologia")
@Data
public class Serologia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "hemocomponente_id")
    private Hemocomponente hemocomponente;
    private Boolean vihPositivo;
    private Boolean hepatitisBPositivo;
    private Boolean hepatitisCPositivo;
    private Boolean sifilisPositivo;
    private Boolean chagasPositivo;
    private LocalDate fechaPrueba;
}
