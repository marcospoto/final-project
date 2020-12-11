// import { useDispatch } from "react-redux";

// // export const addMovie = (movie) => ({
// //   type: "ADD_Movie",
// //   movie,
// // });

// export const addMovie = (movie, email) => {
//   const dispatch = useDispatch();

//   fetch("/favorites", {
//     method: "PUT",
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//     body: JSON.stringify({
//       movie: movie,
//       email: email,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       dispatch({
//         type: "ADD_Movie",
//         movie,
//       });
//     });
// };
