package com.website.Ecommerce.Website.repository;

import com.website.Ecommerce.Website.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource
@CrossOrigin
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByCustomerEmail(@RequestParam String email, Pageable pageable);

}
