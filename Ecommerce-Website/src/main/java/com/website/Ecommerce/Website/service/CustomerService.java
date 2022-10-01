package com.website.Ecommerce.Website.service;

import com.website.Ecommerce.Website.dto.Purchase;
import com.website.Ecommerce.Website.dto.PurchaseResponse;

public interface CustomerService {

    PurchaseResponse purchase(Purchase purchase);
}
