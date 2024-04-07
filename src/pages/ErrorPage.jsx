import { useRouteError } from "react-router-dom";
import './css/ErrorPage.css'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="error-page-message">
                <b><i>{error.statusText || error.message}</i></b>
            </p>
        </div>
    </div>
  );
}