package com.test.phone.webphone.controller;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import com.test.phone.webphone.dto.response.CustomerResponse;
import com.test.phone.webphone.dto.response.ResponseData;
import com.test.phone.webphone.dto.response.ResponseError;
import com.test.phone.webphone.service.CustomerService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {

    CustomerService customerService;

    @PostMapping("/")
    public ResponseData<Integer> addCustomer(@Valid @RequestBody CustomerCreateRequest customerCreateRequest) {
        try {
            customerService.addCustomer(customerCreateRequest);
            return new ResponseData<>(HttpStatus.CREATED.value(), "User added", 1);
        } catch (Exception e) {
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }
    }

    @PutMapping("/{customerId}")
    public ResponseData<String> updateCustomer(@PathVariable @Min(1)  int customerId, @RequestBody CustomerCreateRequest customerCreateRequest) {
        System.out.printf("updateCustomer called with id: %d\n", customerId);
        return new ResponseData<>(HttpStatus.OK.value(), "Update full", "Updated Hello World");
    }

    @PatchMapping("/{customerId}")
    public String patchCustomer(@PathVariable int customerId, @RequestParam boolean status) {
        System.out.printf("patchCustomer called with id: %d\n", customerId);
        return "Patched Hello World";
    }

    @DeleteMapping("/{customerId}")
    public String deleteCustomer(@PathVariable int customerId) {
        System.out.printf("deleteCustomer called with id: %d\n", customerId);
        return "Deleted Hello World";
    }

    @GetMapping("/list")
    public ResponseData<List<CustomerResponse>> listCustomers() {
        return new ResponseData<>(HttpStatus.OK.value(), "List Customers", List.of(new CustomerResponse("fullname", "phone"),
                new CustomerResponse("fill name", "123")));
    }
}
