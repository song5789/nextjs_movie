import { useRouter } from "next/router";
import Title from "../../../components/Title";
import { useState, useEffect } from "react";

async function fetchData(id) {
  const res = await fetch(`http://localhost:3000/api/movies/${id}`);
  const result = await res.json();
  return result;
}

export default function Detail({ params }) {
  const [title, id] = params || [];
  const [state, setState] = useState({
    movie: [],
    loading: false,
    year: null,
    genres: [],
    companies: [],
  });
  useEffect(() => {
    setState((state) => ({ ...state, loading: false }));
    const getData = async (id) => {
      setState((state) => ({ ...state, loading: true }));
      const result = await fetchData(id);
      setState((state) => ({
        ...state,
        movie: result,
        year: result.release_date.slice(0, 4),
        genres: result.genres,
        companies: result.production_companies,
      }));
      setState((state) => ({ ...state, loading: false }));
    };
    getData(id);
  }, [id]);
  const { movie, loading, year, genres, companies } = state;
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Title title={title} />
      <div className="container">
        <div className="movie">
          <h1>
            {title} <span>({year})</span>
          </h1>
          <div className="line"></div>
          <div className="info-container">
            <div className="img-container">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            </div>
            <div className="info-detail">
              <div style={{ textAlign: "center" }}>
                <h3>
                  "<i>{movie.tagline}</i>"
                </h3>
              </div>
              <div>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>
              <div className="genres">
                {genres.map((genre) => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
              </div>
              <div className="etc">
                <div className="ratings">
                  <div>Score</div>
                  <div>
                    <b style={{ color: "#fae934" }}>★</b> {movie.vote_average}
                  </div>
                  <div>
                    <i>{movie.vote_count} Ratings</i>
                  </div>
                </div>
                <div className="ratings">
                  <div>Release</div>
                  <div>{movie.release_date}</div>
                  <div>
                    <i>{movie.status}</i>
                  </div>
                </div>
                <div className="ratings">
                  <div>Runtime</div>
                  <div>{movie.runtime}</div>
                  <div>
                    <i>min</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="companies-container">
          <h2>Production Companies</h2>
          <div className="companies">
            {companies.map((company) => (
              <div className="company" key={company.id}>
                <div>
                  <img src={company.logo_path ? `https://image.tmdb.org/t/p/w500/${company.logo_path}` : `https://placehold.co/250x250?text=${company.name}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            max-width: 1000px;
            min-width: 850px;
            padding: 20px;
            margin: 20px auto;
            background: white;
            border-radius: 16px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          }
          .container h1 {
            width: 100%;
            height: 70px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          }
          .info-container {
            width: 100%;
            display: flex;
            flex-direction: row;
            margin-bottom: 70px;
          }
          .img-container {
            max-width: 350px;
            margin-right: 1rem;
          }
          .img-container img {
            max-width: 100%;
          }
          .info-detail {
            max-width: 650px;
            padding: 0 1rem 0 1rem;
            box-sizing: border-box;
          }
          .genres {
            width: 100%;
            margin: 50px 0 50px 0;
            display: flex;
            flex-direction: row;
          }
          .genres > div {
            padding: 0 0.5rem 0 0.5rem;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: gray;
            border-radius: 12px;
            margin-right: 1rem;
            font-size: 16px;
            font-weight: 700;
            color: white;
          }
          .etc{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
          .etc > div {
            margin-right: 3rem;
          }
          .ratings {
            max-width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .ratings > div:first-child {
            width: 100%
            height: 50px;
            border-bottom: 1px solid black;
            margin-bottom: 10px;
            font-size: 38px;
            font-weight: 700;
          }
          .ratings > div:nth-child(2) {
            font-size: 30px;
            font-weight: 500;
          }
          .ratings > div:last-child {
            font-size: 16px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
          }
          .companies-container {
            width: 100%;
            text-align: center;
          }
          .companies-container > h2 {
            width: 100%;
            height: 50px;
            border-bottom: 1px solid black;
          }
          .companies{
            display: flex;
            flex-direction: row;
            justify-content: center;
            padding: 1rem;
          }
          .company {
            width: 200px;
            margin-right: 2.5rem;
            display: flex;
            align-items: center;
          }
          .company img {
            max-width: 100%;
          }
        `}
      </style>
    </>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
