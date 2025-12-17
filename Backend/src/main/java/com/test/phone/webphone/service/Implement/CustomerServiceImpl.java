package com.test.phone.webphone.service.Implement;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import com.test.phone.webphone.dto.response.CustomerResponse;
import com.test.phone.webphone.entity.Customers;
import com.test.phone.webphone.mapper.CustomerMapper;
import com.test.phone.webphone.repository.CustomerRepo;
import com.test.phone.webphone.service.CustomerService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerServiceImpl implements CustomerService {
    CustomerRepo customerRepo;
    CustomerMapper customerMapper;

    @Override
    public int addCustomer(CustomerCreateRequest request) {
        System.out.printf("CustomerServiceImpl.addCustomer(): %s\n", request);
        if (request.getFullName().equals("ok")){
            throw new ResourceAccessException("Ok not found");
        }
        return 0;
    }

    @Override
    public CustomerResponse createCustomer(CustomerCreateRequest request) {

        if (customerRepo.existsByPhoneNumber((request.getPhoneNumber())))
            throw new ResourceAccessException("Phone already exists");

        Customers customer = customerMapper.toCustomers(request);
        var c = customerRepo.save(customer);
        return customerMapper.toCustomerResponse(c);
    }
}
