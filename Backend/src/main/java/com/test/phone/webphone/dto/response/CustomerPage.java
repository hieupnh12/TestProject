package com.test.phone.webphone.dto.response;

import java.util.List;

public record CustomerPage(List<CustomerResponse> content, int totalElements, int totalPages, int pageNumber, int pageSize) {
}
