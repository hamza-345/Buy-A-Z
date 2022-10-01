package com.website.Ecommerce.Website.repository;

import com.website.Ecommerce.Website.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String email);
}
