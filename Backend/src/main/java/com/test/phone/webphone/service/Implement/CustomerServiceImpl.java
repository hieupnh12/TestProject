package com.test.phone.webphone.service.Implement;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import com.test.phone.webphone.dto.response.CustomerResponse;
import com.test.phone.webphone.entity.Customers;
import com.test.phone.webphone.mapper.CustomerMapper;
import com.test.phone.webphone.repository.CustomerRepo;
import com.test.phone.webphone.service.CustomerService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerServiceImpl implements CustomerService {
    CustomerRepo customerRepo;
    CustomerMapper customerMapper;

    @Override
    public CustomerResponse createCustomer(CustomerCreateRequest request) {
        if (customerRepo.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone already exists");
        }
        Customers customer = customerMapper.toCustomers(request);
        var c = customerRepo.save(customer);
        return customerMapper.toCustomerResponse(c);
    }

    @Override
    public CustomerResponse getCustomer(String customerId) {
        try {
            long id = Long.parseLong(customerId);
            Customers customer = customerRepo.findCustomersByCustomerId(id);
            if (customer == null) throw new EntityNotFoundException("Customer not found with id: " + customerId);
            return customerMapper.toCustomerResponse(customer);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid customer ID format: " + customerId);
        }
    }

    @Override
    @Transactional
    public CustomerResponse updateCustomer(String customerId, CustomerCreateRequest request) {
        try {
            long id = Long.parseLong(customerId);
            Customers customer = customerRepo.findCustomersByCustomerId(id);
            if (customer == null) {
                throw new EntityNotFoundException("Customer not found with id: " + customerId);
            }

            customerMapper.updateCustomer(customer, request);
            var c = customerRepo.save(customer);
            return customerMapper.toCustomerResponse(c);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid customer ID format: " + customerId);
        }
    }

    @Override
    @Transactional
    public CustomerResponse deleteCustomer(String customerId) {
        try {
            long id = Long.parseLong(customerId);
            Customers customer = customerRepo.findCustomersByCustomerId(id);
            if (customer == null) {
                throw new EntityNotFoundException("Customer not found with id: " + customerId);
            }
            customerRepo.delete(customer);
            return customerMapper.toCustomerResponse(customer);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid customer ID format: " + customerId);
        }
    }

    @Override
    public Page<CustomerResponse> listAllCustomers(Pageable pageable) {
        Page<Customers> customers = customerRepo.findAll(pageable);
        return customers.map(customerMapper::toCustomerResponse);
    }
}
