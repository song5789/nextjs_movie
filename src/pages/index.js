import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useRouter } from "next/router";

async function fetchData() {
  const res = await fetch("http://192.168.0.54:3000/api/movies", { cache: "no-store" });
  const { results } = await res.json();
  return results;
}

export default function Home() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    (async () => {
      const fet = await fetchData();
      setResults(fet);
    })();
  }, []);
  const router = useRouter();

  const aStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div className="container">
      <Title title="Home" />
      {results?.map((movie) => (
        <div onClick={() => onClick(movie.id, movie.original_title)} className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          max-width: 1000px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
          margin: 0 auto;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          max-width: 500px;
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
