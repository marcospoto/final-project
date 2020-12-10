const initialState = {};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_Movie": {
      return {
        ...state,
        [action.movie]: {
          ...action.movie,
        },
      };
    }
    default:
      return state;
  }
}

export const getMovieArray = (state) => Object.values(state);
