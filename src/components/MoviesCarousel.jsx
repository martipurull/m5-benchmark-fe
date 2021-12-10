import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import SingleMovie from "./SingleMovie";
import "../componentStyles/MoviesCarousel.css";
import Error from "./Error";

const MoviesCarousel = ({ galleryTitle }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    if (loading) {
      try {
        const resp = await fetch(`${ process.env.REACT_APP_URL }/media`);
        console.log(process.env.REACT_APP_URL)
        if (resp.ok) {
          const loadedMovies = await resp.json();
          setMovies(loadedMovies);
        } else {
          setError(true)
          throw new Error("RESPONSE ERROR!")
        }
      } catch (error) {
        console.log("error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => getMovies(), []);

  if (error) return <Error error={error} />;

  return (
    <>
      <Container className="my-4">
        <h4 className="text-white mb-3">{galleryTitle}</h4>
        <Carousel>
          <Carousel.Item>
            <Row>
              {movies.slice(0, 5).map((m) => (
                <SingleMovie key={m.id} movieObj={m} />
              ))}
            </Row>
          </Carousel.Item>
            ))
        </Carousel>
      </Container>
    </>
  );
};

export default MoviesCarousel;
