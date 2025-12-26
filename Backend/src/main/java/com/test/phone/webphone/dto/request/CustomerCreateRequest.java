package com.test.phone.webphone.dto.request;

import com.test.phone.webphone.util.PhoneNumber;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerCreateRequest {

    @NotBlank(message = "name must be not null.")
    String fullName;
    @PhoneNumber
    String phoneNumber;
    @NotBlank(message = "Email must not be blank.")
    @Email(message = "Invalid email format.")
    String email;
    Boolean gender;
    LocalDate birthDate;
    Boolean isActive;
    String address;
}
