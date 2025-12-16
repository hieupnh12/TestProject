package com.test.phone.webphone.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBodyValidation(
            MethodArgumentNotValidException ex,
            WebRequest request
    ) {
        ErrorResponse error = new ErrorResponse();
        error.setTimestamp(new Date());
        error.setCode(400);
        error.setError("Payload Invalid");
        error.setPath(request.getDescription(false).replace("uri=", ""));

        String message = ex.getBindingResult()
                .getFieldError()
                .getDefaultMessage();

        error.setMessage(message);
        return error;
    }

    @ExceptionHandler(HandlerMethodValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodValidation(
            HandlerMethodValidationException ex,
            WebRequest request
    ) {
        ErrorResponse error = new ErrorResponse();
        error.setTimestamp(new Date());
        error.setCode(400);
        error.setError("Parameter Invalid");
        error.setPath(request.getDescription(false).replace("uri=", ""));
        error.setMessage("Validation failure");
        return error;
    }
}

