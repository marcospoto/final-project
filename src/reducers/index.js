export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_Movie": {
      return {
        ...state,
        [action.movie.id]: {
          ...action.movie,
        },
      };
    }
  }
}
