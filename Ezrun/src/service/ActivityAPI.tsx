import Axios from "axios";

const apiURL ='http://180.180.241.92:3000';
export const  addActivity = async(Username:any,walkRun:any,startTime:any,stopTime:any,distance:any)=> 
    {
    let routeURL = '/activities/add'

    let  newUser ={
        User_Name:Username,
        Act_WalkRun:walkRun,
        Act_Start:startTime,
        Act_Stop:stopTime,
        Act_Distance:distance
                }
        try {
        console.log('User :',newUser.User_Name,' Distance : ',newUser.Act_Distance)
        console.log('url :',apiURL+routeURL+newUser)
        let result = await Axios.post(apiURL+routeURL,newUser)
        console.log("result "+ result.data)
        
        return result
            }
    catch(error){
        alert('oop...'+ error)
            }
        }