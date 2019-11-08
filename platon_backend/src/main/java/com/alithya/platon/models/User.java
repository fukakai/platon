package com.alithya.platon.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "USERS")
public class User {

    @Id
    @SequenceGenerator(name = "USERS_ID_USER_GENERATOR", sequenceName = "USERS_ID_USER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USERS_ID_USER_GENERATOR")
    Long userId;
    String firstName;
    String lastName;

}
