package com.test.phone.webphone.util;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PhoneValidator implements ConstraintValidator<PhoneNumber, String> {

    @Override
    public void initialize(PhoneNumber constraintAnnotation) {
    }

    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext constraintValidatorContext) {
        if(phoneNumber == null) return false;
        if(phoneNumber.matches("\\d{10}")) return true;
        else return phoneNumber.matches("\\d{3}-\\d{3}-\\d{4}");
    }
}
