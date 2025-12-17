package com.test.phone.webphone.repository;

import com.test.phone.webphone.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<Customers,Long> {
    boolean existsByPhoneNumber(String phoneNumber);
}
