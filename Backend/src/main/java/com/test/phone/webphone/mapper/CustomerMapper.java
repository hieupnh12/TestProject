package com.test.phone.webphone.mapper;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import com.test.phone.webphone.dto.response.CustomerResponse;
import com.test.phone.webphone.entity.Customers;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    Customers toCustomers(CustomerCreateRequest request);
    CustomerResponse toCustomerResponse(Customers customers);
}
