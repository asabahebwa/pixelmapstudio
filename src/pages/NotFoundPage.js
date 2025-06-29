import { Link } from "react-router-dom";
import "../styles/NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1>Error 404</h1>
      <h2>Woops. Looks like this page does not exist</h2>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="home-button">
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
