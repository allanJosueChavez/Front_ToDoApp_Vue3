import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

async function evaluateResponse(error) {
  console.log("evaluateResponse");
  console.log(error);
  if(!error.response){
    if(error.code === 'ERR_NETWORK'){
        toast.error("Network error.", {
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          position: "bottom-right",
        });
      }
      return
  }
  if (error.response &&error.response.status === 200) {
    // toast.success('Success');
  } else if (error.response.status === 400 || error.response.status === 500) {
    if (error.response.data.error) {
      toast.error(error.response.data.error, {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: "bottom-center",
      });
    } else {
      toast.error("Oops! Something went wrong, please try again.", {
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        position: "bottom-right",
      });
    }
  }
}

export default {
  evaluateResponse,
};
