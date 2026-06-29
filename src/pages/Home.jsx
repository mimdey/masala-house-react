import hero from "../assets/hero.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section
      className="home-hero"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url(${hero})`,
      }}
    >
      <div className="container hero-content">
        <h1>Masala House</h1>
        <p>
          Authentic Indian cuisine made with fresh spices, bold flavors,
          and family tradition.
        </p>
        <Link to="/menu" className="btn btn-warning rounded-pill px-4 py-2 fw-bold">
          Explore Menu
        </Link>
      </div>
    </section>
  );
}

export default Home;