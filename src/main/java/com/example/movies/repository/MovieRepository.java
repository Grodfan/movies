package com.example.movies.repository;

import com.example.movies.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByMovieTitleOrLanguageContainingOrStorylineContaining(String movieTitle, String language, String storyLine);
}

