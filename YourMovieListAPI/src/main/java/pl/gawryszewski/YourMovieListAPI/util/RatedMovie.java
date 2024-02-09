package pl.gawryszewski.YourMovieListAPI.util;

import pl.gawryszewski.YourMovieListAPI.entity.Movie;

public class RatedMovie implements Comparable<RatedMovie>{

    private float avgRating;
    private Movie movie;

    public RatedMovie(float avgRating, Movie movie) {
        this.avgRating = avgRating;
        this.movie = movie;
    }

    public float getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(float avgRating) {
        this.avgRating = avgRating;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    @Override
    public int compareTo(RatedMovie o) {
        return Float.compare(avgRating, o.getAvgRating());
    }
}
