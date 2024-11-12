import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";

type NavigatePreserveQuery = (
  pathname: string,
  options?: NavigateOptions
) => void;

export function useNavigatePreserveQuery(): NavigatePreserveQuery {
  const navigate = useNavigate();
  const location = useLocation();

  const navigatePreserveQuery: NavigatePreserveQuery = (pathname, options) => {
    navigate(
      {
        pathname,
        search: location.search, // Preserve the current query parameters
      },
      options
    );
  };

  return navigatePreserveQuery;
}