
import book from '../image/image1.png'

import { Grid } from '@mui/material'; 

  
   
export const Home =() =>{

    return (
    <Grid   sx={{alignItems:'center', paddingTop:9,
                          alignContent:'center', paddingLeft:1}}>
        
        <img src={book} alt="Background_image" width={1340} height={520}/>

        
     </Grid>
    );
   }