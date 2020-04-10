import {
  IonInput,IonToast, IonContent, IonItem, IonLabel, IonHeader,
  IonAvatar,useIonViewDidEnter,IonFooter,IonSegmentButton, IonPage,IonSegment,IonItemDivider,IonListHeader,
  IonRadio,IonRadioGroup, IonTitle,IonImg, IonToolbar, IonButtons, IonButton, IonIcon, IonList, IonGrid, IonRow, IonCol, IonChip
} from '@ionic/react';
import shareValue from "./models/share";
import "../cssfile/profilecss.css";
import React, { useState }  from 'react';
import { home,checkmark, save, arrowRoundBack, man,woman,checkmarkCircleOutline, camera} from "ionicons/icons";
import { RouteComponentProps } from 'react-router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { GetUesr,UpUesr} from '../service/UserAPI';
import Axios from 'axios';

const Editprofille: React.FC<RouteComponentProps> = (props) => {
  const { Camera } = Plugins;
  defineCustomElements(window);     
  
 
 
  
  const [ProfileArray, setProfileArray] = useState([]);

  let firstName="";
  let lastName = "";
  let email = "";
  let telnum = "";
  let weight = "";
  let heigth = "";
  let homenum = "";
  let mooban = "";
  let moo = "";
  let soi = "";
  let buildname = "";
  let floor = "";
  let room = "";
  let tumbon = "";
  let aumper = "";
  let province = "";
  let zip = "";
  let segment = "";
  
  let onFirstnameChange = (e: any) => {
    firstName = e.target.value;
    
    console.log("ชื่อเฟิสเนมonchange" + firstName);
    
  }
  let onLastnameChange = (e: any) => {
    console.log("นามสกุล" + e.target.value);
    lastName = e.target.value;
   
  }
  let onEmailChange = (e: any) => {
    console.log("Email" + e.target.value);
    email = e.target.value;
  }
//------------------------------------------
  let ontelChange = (e: any) => {
    console.log("Email" + e.target.value);
    telnum = e.target.value;
  }
  let onweightChange = (e: any) => {
    console.log("Email" + e.target.value);
    weight = e.target.value;
  }
  let onheigthChange = (e: any) => {
    console.log("Email" + e.target.value);
    heigth = e.target.value;
  }
  let onhomenumChange = (e: any) => {
    console.log("Email" + e.target.value);
    homenum = e.target.value;
  }
  let onmoobanChange = (e: any) => {
    console.log("Email" + e.target.value);
    mooban = e.target.value;
  }
  let onmooChange = (e: any) => {
    console.log("Email" + e.target.value);
    moo = e.target.value;
  }
  let onsoiChange = (e: any) => {
    console.log("Email" + e.target.value);
    soi = e.target.value;
  }
  let onbuildnameChange = (e: any) => {
    console.log("Email" + e.target.value);
    buildname = e.target.value;
  }
  let onfloorChange = (e: any) => {
    console.log("Email" + e.target.value);
    floor = e.target.value;
  }
  let onroomChange = (e: any) => {
    console.log("Email" + e.target.value);
    room = e.target.value;
  }
  let ontumbonChange = (e: any) => {
    console.log("Email" + e.target.value);
    tumbon = e.target.value;
  }  
  let onaumperChange = (e: any) => {
    console.log("Email" + e.target.value);
    aumper = e.target.value;
  } 
   let onprovinceChange = (e: any) => {
    console.log("Email" + e.target.value);
    province = e.target.value;
  } 
   let onzipChange = (e: any) => {
    console.log("Email" + e.target.value);
    zip = e.target.value;
  }
  
  let start = async () => {
   
    let user_id =  shareValue.selflogin.User_id;
    let result = await GetUesr(user_id);    
    setProfileArray(result?.data);
    console.log(result?.data);
  }

 let sendsetSegment = (a:any)=>{
    console.log(a);
    segment=a;
    
 }


  useIonViewDidEnter(()=>{ //เป็นการบังคับให้อ่านหรือทำงานสำหรับการเปิดครั้งแรกเท่านั้น
    start();
    
  })

 

 let name = ProfileArray.map((contact:any)=>{
 
  firstName =contact.Name;
  lastName = contact.Surname;
  email =contact.Email;
  telnum = contact.Tel;
  weight = contact.Pro_Weight;
  heigth = contact.Pro_Height;
  homenum = contact.Add_HomeNum;
  mooban = contact.Add_Village;
  moo = contact.Add_Moo;
  soi = contact.Add_soi;
  buildname = contact.Add_Building;
  floor = contact.Add_Floor;
  room = contact.Add_Room;
   tumbon = contact.Add_SubDis;
   aumper = contact.Add_District;
   province = contact.Add_Province;
   zip = contact.Add_Post;
   segment = contact.Gender;
   //setshowpic(contact.Picture);
  return (
    //  shareValue.selected = contact; //share to another file 
    
    <IonGrid >
    <IonRow  >
      <IonCol>
          <IonRow>
             <IonCol>
               <IonItem>
               <IonLabel position="floating"><b>ชื่อจริง</b></IonLabel>
  <IonInput  onIonChange={onFirstnameChange} value={firstName} ></IonInput>
               </IonItem>
          </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonItem>
             <IonLabel position="floating"><b>นามสกุล</b></IonLabel>
             <IonInput onIonChange={onLastnameChange}  value={lastName} ></IonInput>
             </IonItem>
             </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
 <IonSegment color="primary" scrollable value={segment}  onIonChange={(e) => sendsetSegment(e.detail.value as any)}>
            
<IonSegmentButton value="male" layout="icon-start" >
  <IonLabel>ชาย</IonLabel>
  <IonIcon icon={man} ></IonIcon>
</IonSegmentButton>
<IonSegmentButton value="female" layout="icon-start"    >
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
      <IonItem>
        <IonLabel position="floating"><b>Email</b></IonLabel>
        <IonInput type="email" onIonChange={onEmailChange} value={''+contact.Email+''} ></IonInput>
      </IonItem>
    </IonCol>
  </IonRow>
  <IonRow >
    <IonCol>
      <IonItem>
        <IonLabel position="floating"><b>เบอร์โทรศัพท์</b></IonLabel>
        <IonInput type="tel" onIonChange={ontelChange} value={''+contact.Tel+''} ></IonInput>
      </IonItem>
    </IonCol>
  </IonRow>
  
  

  <IonRow >
      <IonCol>
          <IonItem>
            <IonLabel position="floating"><b>ส่วนสูง</b></IonLabel>
            <IonInput onIonChange={onheigthChange} value={''+contact.Pro_Height+''} ></IonInput>
         </IonItem>
      </IonCol>
      <IonCol>
      <IonItem>
        <IonLabel position="floating"><b>น้ำหนัก</b></IonLabel>
        <IonInput  onIonChange={onweightChange} value={''+contact.Pro_Weight+''}  ></IonInput>
      </IonItem>
      </IonCol>
  </IonRow>


  <IonRow>
      <IonCol>
        <IonItem lines="none">
          <IonLabel > <IonIcon slot="start" icon={home} color="primary"/> ข้อมูลที่อยู่</IonLabel>
        </IonItem>
      </IonCol>
  </IonRow>




  <IonRow >
      <IonCol>
          <IonItem>
            <IonLabel position="floating"><b>เลขที่</b></IonLabel>
            <IonInput onIonChange={onhomenumChange }value={''+contact.Add_HomeNum+''}  ></IonInput>
         </IonItem>
      </IonCol>
      <IonCol>
      <IonItem>
        <IonLabel position="floating"><b>หมู่บ้าน</b></IonLabel>
        <IonInput onIonChange={onmoobanChange} value={''+contact.Add_Village+''}  ></IonInput>
      </IonItem>
      </IonCol>

     
  </IonRow>

  <IonRow >
      <IonCol>
          <IonItem>
            <IonLabel position="floating"><b>ซอย</b></IonLabel>
            <IonInput onIonChange={onsoiChange} value={''+contact.Add_soi+''}  ></IonInput>
         </IonItem>
      </IonCol>
      <IonCol>
      <IonItem>
        <IonLabel position="floating"><b>ชื่ออาคาร</b></IonLabel>
        <IonInput onIonChange={onbuildnameChange} value={''+contact.Add_Building+''}  ></IonInput>
      </IonItem>
      </IonCol>
  </IonRow>

<IonRow>
<IonCol>
      <IonItem>
        <IonLabel position="floating"><b>หมู่ที่</b></IonLabel>
        <IonInput  onIonChange={onmooChange} value={''+contact.Add_Moo+''}  ></IonInput>
      </IonItem>
      </IonCol>


      <IonCol>
      <IonItem>
        <IonLabel position="floating"><b>ชั้น</b></IonLabel>
        <IonInput onIonChange={onfloorChange} value={''+contact.Add_Floor+''}  ></IonInput>
      </IonItem>
      </IonCol>
      <IonCol>
      <IonItem>
        <IonLabel position="floating"><b>ห้อง</b></IonLabel>
        <IonInput onIonChange={onroomChange} value={''+contact.Add_Room+''}  ></IonInput>
      </IonItem>
      </IonCol>

 </IonRow> 


  <IonRow >
      <IonCol>
          <IonItem>
            <IonLabel position="floating"><b>ตำบล</b></IonLabel>
            <IonInput  onIonChange={ontumbonChange} value={''+contact.Add_SubDis+''}  ></IonInput>
         </IonItem>
      </IonCol>
      <IonCol>
      <IonItem>
        <IonLabel position="floating"><b>อำเภอ</b></IonLabel>
        <IonInput onIonChange={onaumperChange} value={''+contact.Add_District+''}  ></IonInput>
      </IonItem>
      </IonCol>

      <IonCol>
      <IonItem>
        <IonLabel position="floating"><b>จังหวัด</b></IonLabel>
        <IonInput  onIonChange={onprovinceChange} value={''+contact.Add_Province+''} ></IonInput>
      </IonItem>
      </IonCol>
  </IonRow>

  <IonRow >
      <IonCol>
          <IonItem>
            <IonLabel position="floating"><b>รหัสไปรษณีย์</b></IonLabel>
            <IonInput  onIonChange={onzipChange} value={''+contact.Add_Post+''}  ></IonInput>
         </IonItem>
      </IonCol>
  </IonRow>
  </IonGrid>
   
      )
  
      
   });

  
  let onSave = async() => {
    console.log ("เริ่มส่งบันทึก");
    console.log ("ชื่อในonsave"+firstName);
    let user_id=shareValue.selflogin.User_id;;
    let result= await UpUesr(user_id,firstName,lastName,email,telnum,weight,heigth,homenum,
      mooban,moo,soi,buildname,floor,room,tumbon,aumper,province,zip,segment
      );
    if(result?.data.success){ //? หมายถึงถ้า undifie ให้ข้ามไปเลย
      
      props.history.goBack();
       // setShowToast1(true);
        console.log ("successinonsave"+result?.data.success);


    }
    else 
    
    console.log ("success"+result?.data.success);
   }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" >
            <IonButton  onClick={() => props.history.goBack()} >
              <IonIcon icon={arrowRoundBack} slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="end" >
            <IonButton   onClick={onSave} >
              <IonIcon icon={checkmarkCircleOutline}  color="success" slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" >    
     
     
{name}

        

      </IonContent>

    </IonPage>
    
  );
};

export default Editprofille;