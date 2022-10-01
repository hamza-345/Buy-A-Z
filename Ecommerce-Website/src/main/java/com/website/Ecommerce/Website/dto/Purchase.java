package com.website.Ecommerce.Website.dto;

import com.website.Ecommerce.Website.entity.Address;
import com.website.Ecommerce.Website.entity.Customer;
import com.website.Ecommerce.Website.entity.Order;
import com.website.Ecommerce.Website.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
