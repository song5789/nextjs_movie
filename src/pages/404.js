import Title from "../../components/Title";

export default function NotFound() {
  return (
    <>
      <Title title={"Error 404"} />
      <div className="container">
        <h1>Error code 404 !</h1>
        <h2>Page not found</h2>
      </div>
      <style jsx>
        {`
          .container {
            max-width: 1000px;
            margin: 20px auto;
            padding: 3rem;
            background: white;
            border-radius: 16px;
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
