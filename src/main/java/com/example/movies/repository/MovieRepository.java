package com.example.movies.repository;

import com.example.movies.entity.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Integer>{
    List<Movie> getMovieByLanguage(String language);
}

