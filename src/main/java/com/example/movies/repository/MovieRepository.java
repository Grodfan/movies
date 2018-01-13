package com.example.movies.repository;

import com.example.movies.entity.Movie;
import org.springframework.data.repository.CrudRepository;

public interface MovieRepository extends CrudRepository<Movie, Integer>{

}

