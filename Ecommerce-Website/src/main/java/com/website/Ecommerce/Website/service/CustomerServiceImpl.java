package com.website.Ecommerce.Website.service;

import com.website.Ecommerce.Website.dto.Purchase;
import com.website.Ecommerce.Website.dto.PurchaseResponse;
import com.website.Ecommerce.Website.entity.Customer;
import com.website.Ecommerce.Website.entity.Order;
import com.website.Ecommerce.Website.entity.OrderItem;
import com.website.Ecommerce.Website.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;
    @Override
    public PurchaseResponse purchase(Purchase purchase) {
        System.out.println(purchase.getOrderItems());
        Order order = purchase.getOrder();
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        String trackingNumber = calculateTrackingNumber();
        order.setOrderTrackingNumber(trackingNumber);
        Customer customer = purchase.getCustomer();
        Customer existingCustomer = customerRepository.findByEmail(customer.getEmail());
        if(existingCustomer != null) {
            customer = existingCustomer;
        }
        customer.add(order);
        customerRepository.save(customer);
        return new PurchaseResponse(trackingNumber);
    }

    private String calculateTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
