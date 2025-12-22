package com.test.phone.webphone.resolver;

import com.test.phone.webphone.dto.response.CustomerPage;
import com.test.phone.webphone.dto.response.CustomerResponse;
import com.test.phone.webphone.mapper.CustomerMapper;
import com.test.phone.webphone.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class CustomerQueryResolver {

    private final CustomerService customerService;
    private final CustomerMapper customerMapper;

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
}
