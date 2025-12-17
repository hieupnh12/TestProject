package com.test.phone.webphone.service;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import com.test.phone.webphone.dto.response.CustomerResponse;

public interface CustomerService {

    int addCustomer(CustomerCreateRequest request);
    public CustomerResponse createCustomer(CustomerCreateRequest request);
}
