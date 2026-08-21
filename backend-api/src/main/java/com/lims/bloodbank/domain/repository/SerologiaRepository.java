package com.lims.bloodbank.domain.repository;

import com.lims.bloodbank.domain.model.Serologia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SerologiaRepository extends JpaRepository<Serologia, Long> {}
