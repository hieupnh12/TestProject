package com.test.phone.webphone.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseData<T> {
    int code;
    String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    T data;
}
