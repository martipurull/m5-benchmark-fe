import { useEffect, useState } from "react";
import { movies } from "../data/movies";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import SingleMovie from "./SingleMovie";
import "../componentStyles/MoviesCarousel.css";
import Error from "./Error";

const MoviesCarousel = ({ galleryTitle, query }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [moviesJson, setMoviesJson] = useState(null);

  const getMovies = async () => {
    if (loading) {
      try {
        const resp = await movies(query);

        if (resp.Error) {
          setError(resp.Error);
        } else {
          const moviesDataReshaped = [];
          while (resp.Search.length)
            moviesDataReshaped.push(resp.Search.splice(0, 6));

          setMoviesJson(moviesDataReshaped);
        }
      } catch (error) {
        console.log("error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [query]);

  useEffect(() => getMovies());

  if (error) return <Error error={error} />;

  return (
    <>
      <Container className="my-4">
        <h4 className="text-white mb-3">{galleryTitle}</h4>
        <Carousel>
          {moviesJson &&
            moviesJson.map((moviesRow, index) => (
              <Carousel.Item key={index}>
                <Row>
                  {moviesRow.map((m) => (
                    <SingleMovie key={m.imdbID} movieObj={m} />
                  ))}
                </Row>
              </Carousel.Item>
            ))}
        </Carousel>
      </Container>
    </>
  );
};

export default MoviesCarousel;
