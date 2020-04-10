import React,{ useState } from 'react';
import { IonImg,IonSegmentButton,IonSegment,IonContent,IonItem,IonIcon,useIonViewDidEnter,
  IonLoading,IonRefresherContent ,IonPopover,IonButton,
  IonInput ,IonGrid, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar,IonAvatar,IonLabel,
  IonCardContent,IonFooter,IonCardHeader,IonCard,IonList,IonRow,IonCol} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { settings,woman,man,walk,bicycle, stats, grid } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import "../cssfile/profilecss.css";
import {  EmailShareButton,  FacebookShareButton,LineShareButton} from "react-share";
import { GetUesr,savePic} from '../service/UserAPI';
import {    FacebookIcon,   LineIcon,} from "react-share";
import shareValue from "./models/share";
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';




const Tab3Page: React.FC<RouteComponentProps> = (props) => {
  const { Camera } = Plugins;
  defineCustomElements(window);     
  
  
  const [segment, setSegment] = useState("all");
  const [ProfileArray, setProfileArray] = useState([]);
  const [counter, setcounter] = useState(0);
  const [showpic, setshowpic] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [pic, setpic] = useState("");
  
  let user_id = shareValue.selflogin.User_id;
  let fisrtpic = "";
  let sendpic:any 
  let takePicture = async() => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64  
      });
      sendpic = image.base64String;
      let  imageUrl:any = image.base64String;
      
      setcounter(counter +1);
      
      setpic(imageUrl);
      setshowpic("data:image/jpeg;base64,"+imageUrl);
      console.log(showpic);

      try 
      {
        savePicture();
       
      } catch (error) {
        
      }
     
    //  setpic("data:image/jpeg;base64,"+imageUrl);
  }


  let startGetEUser = async () => {
    setShowLoading(true);
    let result = await GetUesr(user_id); 
    setProfileArray(result?.data);
    setShowLoading(false);

  }

  let savePicture = async () => {
    setShowLoading(true);
    let result = await savePic(user_id,sendpic); 
    console.log("savePic"+pic);
    console.log(result);
    setShowLoading(false);

  }

  useIonViewDidEnter(()=>{ //เป็นการบังคับให้อ่านหรือทำงานสำหรับการเปิดครั้งแรกเท่านั้น
    
    
    
    startGetEUser();
    


  })
 



  let name = ProfileArray.map((contact:any)=>{
    fisrtpic=contact.Picture;
    return (
    //  shareValue.selected = contact; //share to another file 

<IonGrid>
  <IonRow>
  <IonCol>
        <IonAvatar  class="avatareditprofile"  onClick={  takePicture }   >
         <IonImg   src=    {(() => { 
          if(counter>0) 
          {
          return showpic
          }
          else 
          {
           return fisrtpic
          }
        })()} ></IonImg>
        </IonAvatar>
      </IonCol>
      <IonCol>
          <IonRow>
             <IonCol>
               <IonItem onClick={()=>{props.history.push("/Editprofile")}}>
               
               <IonLabel position="floating"><b>ชื่อจริง</b></IonLabel>
               <IonInput  value={contact.Name} ></IonInput>
               </IonItem>

          </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonItem onClick={()=>{props.history.push("/Editprofile")}}> 
            <IonLabel position="floating"><b>นามสกุล</b></IonLabel>
               <IonInput  value={contact.Surname} ></IonInput>
             
             </IonItem>
          
             </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonSegment color="primary" onIonChange={(e) => setSegment(e.detail.value as any)}>  
            <IonSegmentButton value="man" layout="icon-start" checked={contact.Gender === 'male'} >
              <IonLabel>ชาย</IonLabel>
              <IonIcon icon={man} ></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton value="woman" layout="icon-start"  checked={contact.Gender === 'female'}>
              <IonLabel>หญิง</IonLabel>
              <IonIcon icon={woman} ></IonIcon>
            </IonSegmentButton>
            </IonSegment>
             
              </IonCol>
            </IonRow>
      </IonCol>
    </IonRow>   

  <IonRow >
         <IonCol>
           <IonItem  lines="none"> 
           <IonIcon slot="start" icon={walk} color="primary"/>
             10.5Km 
           </IonItem>
         </IonCol>
         <IonCol>
           <IonItem lines="none" > 
           <IonIcon slot="start" icon={bicycle} color="primary"/>
             <IonLabel  >57.6Km </IonLabel>
           </IonItem>
         </IonCol>
        
     </IonRow>
     </IonGrid>  
   
      )
   });



   




  return (
    <IonPage>
    <IonHeader>
    <IonToolbar>
            
                <IonTitle> 
                <IonButtons>
                Profile
                </IonButtons>                
                </IonTitle>
              <IonButtons slot="end">
                   <IonButton icon-only onClick={()=>{props.history.push('/Setting')}}>
                   <IonIcon slot="icon-only" icon={settings} ></IonIcon>
                  </IonButton>
               </IonButtons>
   </IonToolbar>
        </IonHeader>


        
  <IonContent className="ion-padding" >
  <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
        
      />
   
     {name}
        <IonList>
        <IonItem  lines="none">
        <IonIcon slot="start" icon={stats} color="primary"/>
            statistics
          </IonItem>

          <IonItem button  onClick={()=>{props.history.push("/Editprofile")}}>
              <h6>Your Ranking      130 </h6>
            </IonItem>
            <IonItem button   onClick={()=>{props.history.push("/Editprofile")}}>
              <h6>All KM. </h6>
            </IonItem>
            <IonItem button   onClick={()=>{props.history.push("/Editprofile")}}>
              <h6>Last Activity </h6>
            </IonItem>
          </IonList>
          
 


 
      
 

</IonContent>


   <IonFooter >
   
   <IonToolbar class="ion-text-center" >
   <FacebookShareButton  url="https://www.facebook.com/tataez.nameofgod">
   <IonLabel  class="ion-text-center" ><FacebookIcon size={30} round={true}  /></IonLabel>
    </FacebookShareButton>
    
     <LineShareButton url="https://www.facebook.com/tataez.nameofgod">
     <LineIcon size={30} round={true}  />
     </LineShareButton>
     </IonToolbar>
     
  
   


</IonFooter>  

</IonPage>
  );
};

export default Tab3Page;
