package com.lims.bloodbank.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "pacientes")
@Data
public class Paciente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String documento;
    private String nombres;
    private String apellidos;
    private String sexo;
    private LocalDate fechaNacimiento;
    
    private String grupoSanguineo;
    private String factorRh;
    
    // Datos Hospitalarios (Hospital de Ate)
    private String historiaClinica;
    private String diagnostico;
    private String servicioAtencion; // ej. Emergencia, UCI, Cirugía
    private String areaInternacion; // ej. Piso 3, Pabellón B
    private String numeroCama;
    private String medicoTratante;
    private LocalDateTime fechaRegistro;

    // --- NUEVOS CAMPOS CLÍNICOS ---
    private String anticuerposIrregulares; // Positivo/Negativo/Desconocido
    private Integer gestaciones; // Relevante para mujeres (aloinmunización)
    private String nivelUrgencia; // Rutina, Urgencia, Emergencia, Protocolo Masivo

    // --- NUEVOS CAMPOS AVANZADOS (NIVEL III) ---
    private String fenotipoExtendido; // Ej: K-, C+, c-, E-, e+
    private Boolean requiereSangreIrradiada; // Obligatorio para neonatos o inmunosuprimidos
    private Boolean historialReaccionesAdversas;

    public Long getId() {
        return id;
    }
}
