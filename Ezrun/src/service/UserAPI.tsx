import Axios from "axios";

const apiurl ="http://180.180.241.92/MyPhpAPI/";

export const createEmployee=async(firstName:any,lastName:any,email:any)=>{

    let routeURL = 'getuserdetail.php';
    let newEmployee= {
        first_name:firstName,
        last_name:lastName,
        email:email
    }

    try {
    let result = await Axios.post(apiurl+routeURL,newEmployee); 
     console.log(result);   
     return result;
    } catch (error) {
        alert('Opps.ss...'+ error);
        
    }
    
}



export const GetUesr = async (user_id:any) => {

    let routeURL = 'getuserdetail.php';
    let Userid= {
        user_id :user_id 
    }
    try {
        let result = await Axios.post(apiurl+routeURL,Userid);    
         return result;
         console.log(result?.data);  
        } catch (error) {
            alert('Opps..ss..'+ error);
            
            
        }
}



export const savePic = async (user_id:any,user_img:any) => {

    let routeURL = 'updatepic.php';
    let Userid= {
        user_id :user_id ,
        user_img:user_img
    }
    try {
        let result = await Axios.post(apiurl+routeURL,Userid,{ headers: {
            'Content-Type': 'multipart/form-data'
          }});       
         return result;
         console.log(result?.data);  
        } catch (error) {
            alert('CantsaveyourPicture'+ error);
            
            
        }
}





export const UpUesr = async (user_id:any,user_fname:any,user_lastname:any,user_email:any,user_telnum:any
    ,user_weight:any,user_heigth:any,user_homenum:any,user_mooban:any,user_moon:any,user_soi:any,user_buildname:any
    ,user_floor:any,user_room:any,user_tumbon:any,user_aumper:any,user_province:any,user_zip:any,user_gen:any
    ) => {

    let routeURL = 'updateuser.php';
    let Userid= {
        user_id :user_id ,
        user_fname :user_fname,
        user_lastname:user_lastname,
        user_email:user_email,
        user_telnum:user_telnum,
        user_weight:user_weight,
        user_heigth:user_heigth,
        user_homenum:user_homenum,
        user_mooban:user_mooban,
        user_moon:user_moon,
        user_soi:user_soi,
        user_buildname:user_buildname,
        user_floor:user_floor,
        user_room:user_room,
        user_tumbon:user_tumbon,
        user_aumper:user_aumper,
        user_province:user_province,
        user_zip:user_zip,
        user_gen:user_gen}
    try {
        let result = await Axios.post(apiurl+routeURL,Userid,{ headers: {
            'Content-Type': 'multipart/form-data'
          }});   

        console.log(result?.data.success);  
         return result;
        } catch (error) {
            alert('Opps..ss..'+ error);
            
            
        }
}