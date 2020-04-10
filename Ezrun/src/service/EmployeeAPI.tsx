import Axios from "axios";
const apiURL='http://180.180.241.92:3003';
//const apiURL='http://localhost:3000';
export const createEmployee=async(firstname:any,lastname:any,email:any)=>{
    let rootURL='/employees/create';
    let newEmployee={
        first_name:firstname,
        last_name:lastname,
        email:email

        
    }
    try{
    let result = await Axios.post(apiURL+rootURL,newEmployee);
    console.log(result);
    return result;
    } catch (error){
        alert('Opps...'+error)
    }
    
}
    export const getEmployees =async()=>{
        let routeURL = '/employees';
        try {
            let result = await Axios.get(apiURL+routeURL);
            return result;
        }catch(error){
             alert(error)
         }

    }
export const getAuthen =async(User_Name:any,User_Password:any)=>{
        let routeURL = '/login/getAuthen';
        let UserCheck={
            User_Name:User_Name,
            User_Password:User_Password
        }
        try{
        let result = await Axios.post(apiURL+routeURL,UserCheck);
        console.log('ผลใน API'+result);
        return result;
        } catch (error){
            alert('username หรือ รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง...')
        }
        
    }
export const createUser=async(User_Name:any,User_Password:any,Name:any,Surname:any,IDNum:any,email:any,Picture:any,Gender:any,Team:any,Tel:any)=>{
        let rootURL='/employees/createUser';
        let newUser={
            User_Name:User_Name,
            User_Password:User_Password,
            Name:Name,
            Surname:Surname,
            IDNum:IDNum,
            email:email,
            Picture:Picture,
            Gender:Gender,
            Team:Team,
            Tel:Tel
    
            
        }
        try{
        let result = await Axios.post(apiURL+rootURL,newUser);
        console.log(result);
        return result;
        } catch (error){
            alert('บันทึกข้อมูลไม่ถูกต้องกรุณาตรวจสอบข้อมูลอีกครั้ง...'+error)
        }
        
    }   
    export const apicheck=async(User_Name:any,User_Password:any,Name:any,Surname:any,IDNum:any,email:any,Picture:any,Gender:any,Team:any,Tel:any)=>{
        let rootURL='/employees/apicheck';
        let newUser={
            User_Name:User_Name,
            User_Password:User_Password,
            Name:Name,
            Surname:Surname,
            IDNum:IDNum,
            email:email,
            Picture:Picture,
            Gender:Gender,
            Team:Team,
            Tel:Tel
    
            
        }
        try{
        let result = await Axios.post(apiURL+rootURL,newUser);
        console.log(result);
        return result;
        } catch (error){
            alert('บันทึกข้อมูลไม่ถูกต้องกรุณาตรวจสอบข้อมูลอีกครั้ง...'+error)
        }
        
    }   