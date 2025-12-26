package com.test.phone.webphone.resolver;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import com.test.phone.webphone.dto.response.CustomerPage;
import com.test.phone.webphone.dto.response.CustomerResponse;
import com.test.phone.webphone.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class CustomerGraphqlController {

    private final CustomerService customerService;

    @QueryMapping
    public CustomerResponse customerById(@Argument String customerId) {
        return customerService.getCustomer(customerId);
    }

    @QueryMapping
    public CustomerPage customers(
            @Argument Integer page,
            @Argument Integer size
    ) {
        Pageable pageable = PageRequest.of(
                page != null ? page : 0,
                size != null ? size : 10
        );

        Page<CustomerResponse> customerPage = customerService.listAllCustomers(pageable);

        return new CustomerPage(
                customerPage.getContent(),
                (int) customerPage.getTotalElements(),
                customerPage.getTotalPages(),
                customerPage.getNumber(),
                customerPage.getSize()
        );
    }

    @MutationMapping
    public CustomerResponse createCustomer(@Argument("input") CustomerCreateRequest input) {
        return customerService.createCustomer(input);
    }

    @MutationMapping
    public CustomerResponse updateCustomer(@Argument String customerId, @Argument("input") CustomerCreateRequest input) {
        return customerService.updateCustomer(customerId, input);
    }

    @MutationMapping
    public boolean deleteCustomer(@Argument String customerId) {
        customerService.deleteCustomer(customerId);
        return true;
    }
}
