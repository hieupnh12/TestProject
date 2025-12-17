package com.test.phone.webphone.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "customer_auths")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerAuths {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long authId;
    Long customerId;
    String provider;
    String providerUserId;
    String accessToken;
    String refreshToken;
}
