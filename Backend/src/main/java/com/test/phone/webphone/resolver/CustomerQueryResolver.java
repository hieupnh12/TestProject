package com.test.phone.webphone.resolver;

import com.test.phone.webphone.dto.response.CustomerResponse;
import com.test.phone.webphone.dto.response.ResponseData;
import com.test.phone.webphone.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class CustomerQueryResolver {

    private final CustomerService customerService;

    @QueryMapping
    public ResponseData<CustomerResponse> customerById(@Argument String customerId) {
        CustomerResponse customer = customerService.getCustomer(customerId);
        return new ResponseData<>(200, "User", customer);
    }
}
