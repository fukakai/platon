package com.alithya.platon.controllers;

import com.alithya.platon.models.User;
import com.alithya.platon.services.UserService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//TODO: Test on returned objets
//TODO: Exceptions to return to users
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping
    public Optional<User> addUsers(@RequestBody User user) {
        return userService.addOrUpdate(user);
    }

    @PutMapping("/{id}")
    public Optional<User> updateUsers(@RequestBody User user) {
        return userService.addOrUpdate(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @DeleteMapping("/{id}")
    public String deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return "User Deleted";
    }


}




