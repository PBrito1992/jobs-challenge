import {
  useContext,
  createContext,
  useReducer,
  useCallback,
  useMemo,
  FC,
  PropsWithChildren,
} from "react";

type TFiltersContext = {
  searchTerm: string;
  isFullTime: boolean;
  location: string;
  updateSearchTerm: (newTerm: string) => void;
  updateIsFullTime: (isFullTime: boolean) => void;
  updateLocation: (newLocation: string) => void;
};

type UPDATE_SEARCH_TERM = "UPDATE_SEARCH_TERM";
type UPDATE_FULLTIME = "UPDATE_FULLTIME";
type UPDATE_LOCATION = "UPDATE_LOCATION";

type TAction =
  | {
      data: string;
      type: UPDATE_SEARCH_TERM;
    }
  | {
      data: boolean;
      type: UPDATE_FULLTIME;
    }
  | {
      data: string;
      type: UPDATE_LOCATION;
    };

const reducer = (
  state: Pick<TFiltersContext, "searchTerm" | "isFullTime" | "location">,
  action: TAction
) => {
  switch (action.type) {
    case "UPDATE_SEARCH_TERM":
      return { ...state, searchTerm: action.data };
    case "UPDATE_LOCATION":
      return { ...state, location: action.data };
    case "UPDATE_FULLTIME":
      return { ...state, isFullTime: action.data };
    default:
      return state;
  }
};

const FiltersContext = createContext<TFiltersContext>({
  searchTerm: "",
  isFullTime: false,
  location: "",
  updateSearchTerm: () => {},
  updateIsFullTime: () => {},
  updateLocation: () => {},
});

const FiltersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filters, dispatch] = useReducer(reducer, {
    searchTerm: "",
    isFullTime: false,
    location: "",
  });

  const updateSearchTerm = useCallback((newTerm: string) => {
    dispatch({
      type: "UPDATE_SEARCH_TERM",
      data: newTerm,
    });
  }, []);

  const updateIsFullTime = useCallback((isFullTime: boolean) => {
    dispatch({
      type: "UPDATE_FULLTIME",
      data: isFullTime,
    });
  }, []);

  const updateLocation = useCallback((newLocation: string) => {
    dispatch({
      type: "UPDATE_LOCATION",
      data: newLocation,
    });
  }, []);

  const ctxValue = useMemo(
    () => ({
      searchTerm: filters.searchTerm,
      isFullTime: filters.isFullTime,
      location: filters.location,
      updateSearchTerm,
      updateIsFullTime,
      updateLocation,
    }),
    [filters, updateSearchTerm, updateIsFullTime, updateLocation]
  );

  return (
    <FiltersContext.Provider value={ctxValue}>
      {children}
    </FiltersContext.Provider>
  );
};

const useFilters = () => {
  const ctx = useContext(FiltersContext);

  if (!ctx)
    throw new Error("useFilters must be used inside of FiltersProvider!");

  return ctx;
};

export { FiltersProvider, useFilters };
