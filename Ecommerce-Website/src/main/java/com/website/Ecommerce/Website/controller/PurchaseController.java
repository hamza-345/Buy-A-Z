package com.website.Ecommerce.Website.controller;

import com.website.Ecommerce.Website.dto.Purchase;
import com.website.Ecommerce.Website.dto.PurchaseResponse;
import com.website.Ecommerce.Website.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/checkout")
public class PurchaseController {
    @Autowired
    CustomerService checkoutService;

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        return checkoutService.purchase(purchase);
    }
}
