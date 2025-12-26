package com.test.phone.webphone.controller;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import com.test.phone.webphone.dto.response.CustomerResponse;
import com.test.phone.webphone.dto.response.ResponseData;
import com.test.phone.webphone.service.CustomerService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/customer")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {

    CustomerService customerService;

    @PostMapping
    public ResponseData<CustomerResponse> createCustomer(@Valid @RequestBody CustomerCreateRequest customerCreateRequest) {
        CustomerResponse customerResponse = customerService.createCustomer(customerCreateRequest);
        return new ResponseData<>(HttpStatus.CREATED.value(), "User added", customerResponse);
    }

    @PutMapping("/{customerId}")
    public ResponseData<CustomerResponse> updateCustomer(@PathVariable String customerId, @RequestBody CustomerCreateRequest customerCreateRequest) {
        CustomerResponse customerResponse = customerService.updateCustomer(customerId, customerCreateRequest);
        return new ResponseData<>(HttpStatus.OK.value(), "User updated", customerResponse);
    }

    @DeleteMapping("/{customerId}")
    public ResponseData<CustomerResponse> deleteCustomer(@PathVariable String customerId) {
        CustomerResponse customerResponse = customerService.deleteCustomer(customerId);
        return new ResponseData<>(HttpStatus.OK.value(), "User deleted", customerResponse);
    }

    @GetMapping("/{customerId}")
    public ResponseData<CustomerResponse> findCustomer(@PathVariable String customerId) {
        CustomerResponse customerResponse = customerService.getCustomer(customerId);
        return new ResponseData<>(HttpStatus.OK.value(), "User found", customerResponse);
    }

    @GetMapping
    public ResponseData<Page<CustomerResponse>> getAllCustomers(Pageable pageable) {
        Page<CustomerResponse> customerResponses = customerService.listAllCustomers(pageable);
        return new ResponseData<>(HttpStatus.OK.value(), "List of customers", customerResponses);
    }
}
