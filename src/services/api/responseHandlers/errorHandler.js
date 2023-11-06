import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


async function evaluateResponse(error){
    console.log('evaluateResponse');
    console.log(error.response);
    if(error.response.status === 200){
        toast.success('Success');
    }else if(error.response.status === 400){
        toast.error('Oops! Something went wrong', 
        {
          autoClose: 1500,
          hideProgressBar:  false,
          closeOnClick: true,
          pauseOnHover: true,
          position: 'bottom-right'
          
        });
    } 

}

export default {
    evaluateResponse
}