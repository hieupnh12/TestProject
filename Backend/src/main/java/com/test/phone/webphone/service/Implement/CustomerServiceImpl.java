package com.test.phone.webphone.service.Implement;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import com.test.phone.webphone.dto.response.CustomerResponse;
import com.test.phone.webphone.entity.Customers;
import com.test.phone.webphone.mapper.CustomerMapper;
import com.test.phone.webphone.repository.CustomerRepo;
import com.test.phone.webphone.service.CustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.ResourceAccessException;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerServiceImpl implements CustomerService {
    CustomerRepo customerRepo;
    CustomerMapper customerMapper;

    @Override
    public CustomerResponse createCustomer(CustomerCreateRequest request) {

        if (customerRepo.existsByPhoneNumber((request.getPhoneNumber())))
            throw new ResourceAccessException("Phone already exists");

        Customers customer = customerMapper.toCustomers(request);
        var c = customerRepo.save(customer);
        return customerMapper.toCustomerResponse(c);
    }

    @Override
    public CustomerResponse getCustomer(String customerId) {
        Customers customer = customerRepo.findCustomersByCustomerId(Long.valueOf(customerId));
        if (customer == null) throw new ResourceAccessException("Customer not found with id: " + customerId);
        return customerMapper.toCustomerResponse(customer);
    }

    @Override
    @Transactional
    public CustomerResponse updateCustomer(String customerId, CustomerCreateRequest request) {
        Customers customer = customerRepo.findCustomersByCustomerId(Long.valueOf(customerId));
        if (customer == null) throw new ResourceAccessException("Customer not found with id: " + customerId);

        customer = customerMapper.toCustomers(request);
        var c = customerRepo.save(customer);
        return customerMapper.toCustomerResponse(c);
    }

    @Override
    @Transactional
    public CustomerResponse deleteCustomer(String customerId) {
        Customers customer = customerRepo.findCustomersByCustomerId(Long.valueOf(customerId));
        if (customer == null) throw new ResourceAccessException("Customer not found with id: " + customerId);
        customerRepo.delete(customer);
        return customerMapper.toCustomerResponse(customer);
    }

    @Override
    @Transactional
    public CustomerResponse updateCustomerEachPart(String customerId, CustomerCreateRequest request) {
        Customers customer = customerRepo.findCustomersByCustomerId(Long.valueOf(customerId));
        if (customer == null) throw new ResourceAccessException("Customer not found with id: " + customerId);

        if (request.getFullName() != null) customer.setFullName(request.getFullName());
        if (request.getEmail() != null) customer.setEmail(request.getEmail());
        if (request.getPhoneNumber() != null) customer.setPhoneNumber(request.getPhoneNumber());
        if (request.getAddress() != null) customer.setAddress(request.getAddress());
        if (request.getIsActive() != null) customer.setIsActive(request.getIsActive());
        if (request.getBirthDate() != null) customer.setBirthDate(request.getBirthDate());

        Customers saved = customerRepo.save(customer);
        return customerMapper.toCustomerResponse(saved);
    }

    @Override
    public Slice<CustomerResponse> listAllCustomers(Pageable pageable) {
        Slice<Customers> customers = customerRepo.findAll(pageable);
        return customers.map(customerMapper::toCustomerResponse);
    }
}
