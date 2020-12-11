const initialState = {};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_Movie": {
      console.log(state);
      console.log(action.movie.movie);
      return {
        ...state,
        [action.movie.movie.id]: {
          ...action.movie,
        },
      };
    }
    default:
      return state;
  }
}

export const getMovieArray = (state) => {
  console.log(state);
  return Object.values(state);
};
