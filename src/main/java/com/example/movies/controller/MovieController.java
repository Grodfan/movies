package com.example.movies.controller;

import com.example.movies.entity.Movie;
import com.example.movies.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path = "/movie")
public class MovieController {

    private MovieRepository movieRepository;

    @Autowired
    public MovieController(MovieRepository movieRepository){
        this.movieRepository = movieRepository;
    }

    @GetMapping(path = "/add")
    public @ResponseBody String addNewMovie(
            @RequestParam String movieTitle,
            @RequestParam String storyLine,
            @RequestParam String language,
            @RequestParam Integer runtime
    )
    {
        Movie movie = new Movie();
        movie.setMovieTitle(movieTitle);
        movie.setStoryline(storyLine);
        movie.setLanguage(language);
        movie.setRuntime(runtime);
        movieRepository.save(movie);
        return "Saved";
    }

    @GetMapping(path = ("/all"))
    public @ResponseBody Iterable<Movie> getAllMovies(){
        return movieRepository.findAll();
    }

    @RequestMapping(value = "/find/{language}", method = RequestMethod.GET)
    public List<Movie> getMovieContaining(@PathVariable String language){
        return movieRepository.getMovieByLanguage(language);
    }

}
