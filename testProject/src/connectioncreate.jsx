import axios from "axios";

const Connection = async({selectedOptions, selectedOption, emailType, waitFor, waitType }) => {
    try{
        const connectLink = `${import.meta.env.VITE_API_URL}/emailjourney/createjourney`; 
        console.log("successful");
        const response = await axios.post(connectLink, {
            SelectedList: selectedOptions,
            coldEmailTemplate: selectedOption,
            delayTimeInNumber:waitFor,
            delayTimeInType:waitType,
            SendColdEmailAs: emailType,
        });
        
        return response.data;
      
    }
    catch(error){
        console.log(error);
        alert("Something went wrong");
    }
   
}

export default Connection;