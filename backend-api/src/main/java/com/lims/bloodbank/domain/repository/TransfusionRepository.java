package com.lims.bloodbank.domain.repository;

import com.lims.bloodbank.domain.model.Transfusion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransfusionRepository extends JpaRepository<Transfusion, Long> {}
