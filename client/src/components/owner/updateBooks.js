import { useEffect, useState } from "react"
import Axios from 'axios'
import { TextField, Button, Divider } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

   export const UpdateBook =() =>{

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [cover, setCover] = useState();
  
    const handleSubmit = async() => {
      
      try{
         await Axios.post('http://localhost:8001/updatebook/:'+id, {
            title, author, price, quantity, cover
      })

    }catch(err){
      console.error(err)
    }
  }
  
  const {id}= useParams()
  useEffect(() =>{

  }, [])

    return (
        <center>
          <br/><br/><br/>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField size="small" type="text" name="title" onChange={(e) => setTitle(e.target.value)}
                    label="Book title" required/><br/><br/>
            <TextField size="small"  type="text" name="author" onChange={(e) => setAuthor(e.target.value)}
                    label="author" required/><br/><br/>
            <TextField size="small"  type="number" name="price" label="Price" required
                       onChange={(e) => setPrice(e.target.value)}/><br/><br/>
            <TextField size="small"  type="number" name="quntity" label="Quantity" required
                       onChange={(e) => setQuantity(e.target.value)}/><br/><br/>
                
                <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                        Upload Book Cover
                        <VisuallyHiddenInput type="file" 
                          name="image"
                          onChange={(e) => setCover(e.target.files[0])}
                        />
                        </Button> {cover}
                        <Divider/><br/>
             <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                    >
              Update
         </Button>
          </form> <br/><br/>
     </center>
    );
   }