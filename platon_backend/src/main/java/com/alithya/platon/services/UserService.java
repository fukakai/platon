package com.alithya.platon.services;

import com.alithya.platon.models.User;
import com.alithya.platon.repositories.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public Optional<User> addUser(User user) {
        return this.addOrUpdate(user);
    }

    public Optional<User> addOrUpdate(User user) {
        userRepository.save(user);
        return userRepository.findById(user.getUserId());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

}
