package com.test.phone.webphone.service.Implement;

import com.test.phone.webphone.dto.request.CustomerCreateRequest;
import com.test.phone.webphone.service.CustomerService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Override
    public int addCustomer(CustomerCreateRequest request) {
        System.out.printf("CustomerServiceImpl.addCustomer(): %s\n", request);
        if (request.getFullName().equals("ok")){
            throw new ResourceAccessException("Ok not found");
        }
        return 0;
    }
}
