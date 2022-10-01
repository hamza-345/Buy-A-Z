package com.website.Ecommerce.Website.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="street")
    private String street;

    @Column(name="city")
    private String city;

    @Column(name="province")
    private String province;

    @Column(name="country")
    private String country;

    @Column(name="postal_code")
    private String postalCode;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;



}
