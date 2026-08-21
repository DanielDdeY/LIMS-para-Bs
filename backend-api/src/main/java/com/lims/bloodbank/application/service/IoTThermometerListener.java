package com.lims.bloodbank.application.service;

import org.springframework.stereotype.Service;

@Service
public class IoTThermometerListener {
    // Simula recibir un evento de temperatura de un refrigerador
    public void onTemperatureSpike(String refrigeradorId, double temperaturaActual) {
        if (temperaturaActual > 6.0) {
            System.out.println("ALERTA CRÍTICA: Refrigerador " + refrigeradorId + " superó los 6°C. Descartando bolsas...");
            // Lógica para bloquear todas las bolsas en ese refrigerador
        }
    }
}
