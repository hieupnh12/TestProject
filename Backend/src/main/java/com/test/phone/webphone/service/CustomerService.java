package com.test.phone.webphone.service;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import org.springframework.stereotype.Service;

public interface CustomerService {
    int addCustomer(CustomerCreateRequest request);
}
