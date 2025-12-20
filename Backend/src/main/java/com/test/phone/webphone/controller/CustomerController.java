package com.test.phone.webphone.controller;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import com.test.phone.webphone.dto.response.CustomerResponse;
import com.test.phone.webphone.dto.response.ResponseData;
import com.test.phone.webphone.service.CustomerService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
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

    @PostMapping("/")
    public ResponseData<CustomerResponse> createCustomer(@Valid @RequestBody CustomerCreateRequest customerCreateRequest) {
        try {
            CustomerResponse customerResponse = customerService.createCustomer(customerCreateRequest);
            return new ResponseData<>(HttpStatus.CREATED.value(), "User added", customerResponse);
        } catch (Exception e) {
            return new ResponseData<>(HttpStatus.BAD_REQUEST.value(), e.getMessage(), null);
        }
    }

    @PutMapping("/{customerId}")
    public ResponseData<CustomerResponse> updateCustomer(@PathVariable @Min(1)  String customerId, @RequestBody CustomerCreateRequest customerCreateRequest) {
        try {
            CustomerResponse customerResponse = customerService.updateCustomer(customerId, customerCreateRequest);
            return new ResponseData<>(HttpStatus.OK.value(), "User updated", customerResponse);
        } catch (Exception e) {
            return new ResponseData<>(HttpStatus.BAD_REQUEST.value(), e.getMessage(), null);
        }
    }

    @PatchMapping("/{customerId}")
    public ResponseData<CustomerResponse> patchCustomer(@PathVariable String customerId, @RequestBody CustomerCreateRequest request) {
        try {
            CustomerResponse customerResponse = customerService.updateCustomerEachPart(customerId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "User updated", customerResponse);
        } catch (Exception e) {
            return new ResponseData<>(HttpStatus.BAD_REQUEST.value(), e.getMessage(), null);
        }
    }

    @DeleteMapping("/{customerId}")
    public ResponseData<CustomerResponse> deleteCustomer(@PathVariable String customerId) {
        try {
            CustomerResponse customerResponse = customerService.deleteCustomer(customerId);
            return new ResponseData<>(HttpStatus.OK.value(), "User deleted", customerResponse);
        } catch (Exception e) {
            return new ResponseData<>(HttpStatus.BAD_REQUEST.value(), e.getMessage(), null);
        }
    }

    @GetMapping("/{customerId}")
    public ResponseData<CustomerResponse> findCustomer(@PathVariable String customerId) {
        try {
            CustomerResponse customerResponse = customerService.getCustomer(customerId);
            return new ResponseData<>(HttpStatus.OK.value(), "User found", customerResponse);
        } catch (Exception e) {
            return new ResponseData<>(HttpStatus.BAD_REQUEST.value(), e.getMessage(), null);
        }
    }

    @GetMapping("/")
    public ResponseData<Page<CustomerResponse>> getAllCustomers(Pageable pageable) {
        try {
            Page<CustomerResponse> customerResponses = customerService.listAllCustomers(pageable);
            return new ResponseData<>(HttpStatus.OK.value(), "List of customers", customerResponses);
        } catch (Exception e) {
            return new ResponseData<>(HttpStatus.BAD_REQUEST.value(), e.getMessage(), null);
        }
    }
}
