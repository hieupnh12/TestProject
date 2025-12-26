package com.test.phone.webphone.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "customers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long customerId;
    @Column(nullable = false)
    String fullName;
    @Column(unique = true, nullable = false)
    String phoneNumber;
    @Column(unique = true, nullable = false)
    String email;
    Boolean gender;
    @Builder.Default
    Boolean isActive = true;
    LocalDate birthDate;
    String address;
    @CreationTimestamp
    LocalDateTime createAt;
    @UpdateTimestamp
    LocalDateTime updateAt;
}
