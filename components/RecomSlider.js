import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { useRouter } from "next/router";

export default function RecomSlider({ recommendations }) {
  const settings = {
    className: "re-slider",
    dots: false,
    infinite: true,
    speed: 500,
    slideToShow: 4,
    slideToScroll: 4,
    variableWidth: true,
    nextArrow: <NextArrow className={"re-next-arrow"} />,
    prevArrow: <PrevArrow className={"re-prev-arrow"} />,
  };
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <>
      <div>
        <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>Recommendations</h2>
        <Slider {...settings} style={{ width: "100%" }}>
          {recommendations.map((re) => (
            <>
              <div key={re.id} className="recom">
                <img src={`https://image.tmdb.org/t/p/w500/${re.poster_path}`} />
                <h4>{re.title}</h4>
                <div className="overview" onClick={() => onClick(re.id, re.title)}>
                  {re.overview}
                </div>
              </div>
            </>
          ))}
        </Slider>
      </div>
      <style jsx>
        {`
          .recom {
            width: 250px !important;
            position: relative;
            margin: 0 0.5rem 0 0;
          }
          .recom h4 {
            text-align: center;
          }
          .recom img {
            max-width: 100%;
            height: 375px;
          }
          .overview {
            position: absolute;
            top: 0;
            width: 250px;
            height: 375px;
            font-size: 13px;
            padding: 0.5rem;
            box-sizing: border-box;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            opacity: 0;
            transition: 0.35s;
            z-index: 99999;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          .overview:hover {
            opacity: 1;
          }
        `}
      </style>
    </>
  );
}
