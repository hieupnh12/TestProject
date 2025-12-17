package com.test.phone.webphone.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerResponse {
    Long customerId;
    String fullName;
    String phoneNumber;
    String email;
    Boolean gender;
    LocalDate birthDate;
    String address;
    Boolean isActive;
    LocalDateTime createAt;
    LocalDateTime updateAt;
}
