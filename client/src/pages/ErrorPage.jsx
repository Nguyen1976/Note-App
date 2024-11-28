import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return <>ErrorPage</>;
}

export default ErrorPage;
