package com.test.phone.webphone.dto.response;

public class ResponseError extends ResponseData{
    public ResponseError(int code, String message) {
        super(code, message, null);
    }
}
