import { API } from './API';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import {useFormik} from "formik";
import *as yup from "yup";
const movieValidationSchema=yup.object({
  name: yup.string().required("why not fill this name???"),
  poster: yup.string().required("why not fill this  poster???"),
  rating: yup.string().required("why not fill this rating?").min(4).max(8,"maxium length of rating"),
  summary: yup.string().required("why not fill this summary???"),
  starCast: yup.string().required("why not fill this starCast???"),
   //min(8)
})
export function AddMovie() {
       const history=useHistory();
    const formik = useFormik({
      initialValues: { name: "", poster: "",rating:"",summary:"",starCast:"" },
    validationSchema:movieValidationSchema, 
    onSubmit:(newMovie)=>{
      addMovie(newMovie);
        },
  });
   const addMovie= (newMovie)=>{
               console.log("onSubmit",newMovie);
                fetch(`${API}/movies/`,{method:"POST",
              body:JSON.stringify(newMovie),
            headers:{
              "Content-Type":"application/json"
            },
            }).then(()=>history.push("/movies"));
            };
                     
       return (
      <form onSubmit={formik.handleSubmit} className="add-movie-form">
        <TextField label="Movie Name" id="name" type="text" error={true} helperText="incorrect entry."
        onBlur={formik.handleChange} onChange={formik.handleChange}  value={formik.values.name} />
       {formik.touched.name && formik.errors.name?formik.errors.name :"" }
        <TextField label="Movie Poster" id="poster"type="text" onBlur={formik.handleChange} onChange={formik.handleChange}  value={formik.values.poster} />
     {formik.touched.poster && formik.errors.poster?formik.errors.poster :" "}
                <TextField label="Movie rating" id="rating" type="text" onBlur={formik.handleChange} onChange={formik.handleChange}  value={formik.values.rating} />
               {formik.touched.rating && formik.errors.rating?formik.errors.rating :" "}
               <TextField label="Movie StarCast" id="starCast" type="text" onBlur={formik.handleChange} onChange={formik.handleChange}  value={formik.values.starCast} />
                      {formik.touched.starCast && formik.errors.starCast?formik.errors.starCast :" "}
      <TextField label="Movie Summary" id="summary" type="text" onBlur={formik.handleChange} onChange={formik.handleChange}  value={formik.values.summary} />
        {formik.touched.summary && formik.errors.summary?formik.errors.summary:" "}
        <Button type="submit" variant="contained" >Add movie</Button>
      </form>
    );
  
  }