package com.example.movies.seeder;

import com.example.movies.entity.Movie;
import com.example.movies.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.ArrayList;

@Component
public class DataSeeder implements CommandLineRunner {

    private MovieRepository movieRepository;

    @Autowired
    public DataSeeder(MovieRepository movieRepository){
        this.movieRepository = movieRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        List<Movie> movieList = new ArrayList<>();

        movieList.add(new Movie("Kula", "En berättelse", "Norska", 33));
        movieList.add(new Movie("Batman", "Na na na", "Finska", 90));
        movieList.add(new Movie("Terminator", "I be back", "Engelska", 90));
        movieList.add(new Movie("Madicken", "Rosa", "Svenska", 28));

        movieRepository.save(movieList);
    }
}