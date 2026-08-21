package com.lims.bloodbank.domain.repository;

import com.lims.bloodbank.domain.model.Hemocomponente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HemocomponenteRepository extends JpaRepository<Hemocomponente, Long> {}
