package com.test.phone.webphone.service;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import com.test.phone.webphone.dto.response.CustomerResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface CustomerService {

    CustomerResponse createCustomer(CustomerCreateRequest request);
    CustomerResponse getCustomer(String customerId);
    CustomerResponse updateCustomer(String customerId, CustomerCreateRequest request);
    CustomerResponse deleteCustomer(String customerId);
    CustomerResponse updateCustomerEachPart(String customerId, CustomerCreateRequest request);
    Slice<CustomerResponse> listAllCustomers(Pageable pageable);
}
