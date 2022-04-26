import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useHistory,useParams } from 'react-router-dom';
import { API } from './API';
export function EditMovie() {
  const { id } = useParams();
//  const movie = movielist[id];
 // console.log(movie);
  const [movie,setMovie]=useState(null);
 useEffect(()=> {fetch(`${API}/movies/${id}`,{method:"GET",})
 .then((data)=>data.json())
 .then((mvs)=>setMovie(mvs))
.catch((err)=>console.log(err));
},[]);
console.log(movie);      
    return (
      <div>
       { movie ? <EditMovieForm movie={movie}/>:<h2>Loading</h2>
      }      </div>
          );
  
  }
  function EditMovieForm({movie}){
    const [name, setName] = useState(movie.name);
    const [poster, setPoster] = useState(movie.poster);
    const [rating, setRating] = useState(movie.rating);
    const [summary, setSummary] = useState(movie.summary);
    const [starCast, setStarCast] = useState(movie.starCast);
    const history=useHistory();
    const editMovie=()=>{ 
      const updatedMovie = {
        name: name,
        poster: poster,
        summary: summary,
        starCast: starCast,
        rating: rating
      };
      fetch(`${API}/movies/${movie.id}`,{method:"PUT",
      body:JSON.stringify(updatedMovie),
    headers:{
      "Content-Type":"application/json"
    }
    }).then(()=>history.push("/movies"));
    
    }
    
return(
  <div className="add-movie-form">
  <TextField value={name} label="Movie Name"  type="text" onChange={(event) => setName(event.target
    .value)} />
  <TextField value={poster} label="Movie poster" onChange={(event) => setPoster(event.target
    .value)} />
  <TextField  value={rating} label="Movie rating" onChange={(event) => setRating(event.target
    .value)} />
  <TextField  value={summary} label="Movie starCast" placeholder="starCast" onChange={(event) => setStarCast(event.target
    .value)} />
  <TextField value={starCast} label="Movie summary"  onChange={(event) => setSummary(event.target
    .value)} />
  <Button variant="contained" color="success" onClick={() => editMovie()
    }>save</Button>
</div>
)
  }
 
  