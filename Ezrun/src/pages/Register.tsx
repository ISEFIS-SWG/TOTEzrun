import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonInput, IonFooter, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import {close} from "ionicons/icons"
import { createUser } from '../service/EmployeeAPI';
import shareValue from './models/share';
let User_Name = "";
let firstname = "";
let lastname = "";
let Email = "";
let dbpasswd = "";
let IDNum = "-";
let Picture = "-";
let Gender = "-";
let Team="-";
let Tel="-";
const Register: React.FC<RouteComponentProps> = (props) => {
 
    const [showLoading, setShowLoading] = useState(false);
    let onAvatarChange = (e:any)=>{
        console.log('Avatar '+e.target.value)
        User_Name=e.target.value;
    }
    let onFirstNameChange = (e:any)=>{
        console.log('ชื่อ '+e.target.value)
        firstname=e.target.value;
    }
    let onLastNameChange = (e:any)=>{
        console.log('นามสกุล '+e.target.value)
        lastname=e.target.value;
    }
    let onEmailChange = (e:any)=>{
        console.log('Email '+e.target.value)
        Email=e.target.value;
    }

    let onPasswordChange = (e:any)=>{
        console.log('Email '+e.target.value)
        dbpasswd=e.target.value;
    }
    let onSave =async()=>{
        setShowLoading(true);
            console.log('เริ่มส่ง request บันทึกข้อมูลผูใช้ใหม่');
        let result= await createUser(User_Name,dbpasswd,firstname,lastname,IDNum,Email,User_Name,Gender,Team,Tel)
        console.log('เริ่มส่ง '+result?.data.User_id);
        if(result?.data.success){
                //props.history.goBack();
                //shareValue.selfregis=User_Name

                //shareValue.selfregis.User_id=result?.data.User_id
                shareValue.selflogin=result?.data;
                shareValue.User_id=result?.data.User_id
                shareValue.User_Name=result?.data.User_Name
                shareValue.LoginFrom=1
                setShowLoading(false);
                props.history.push('/Home')
            }else setShowLoading(false);
    }
    const backPage = () => {

        props.history.goBack();
      }
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar color="primary" mode="ios">
          <IonButtons slot="start">
            <IonButton onClick={backPage}>
              <IonIcon slot="icon-only" name="arrow-back" />
            </IonButton>
          </IonButtons>
          <IonButtons slot='end'>
                <IonButton onClick={()=>{props.history.goBack()}}>
                <IonIcon icon={close} slot='icon-only'></IonIcon></IonButton>
            </IonButtons>
          <IonTitle>ลงทะเบียนผู้ใช้</IonTitle>
        </IonToolbar> 
            </IonHeader>
            <IonContent >
            <IonLoading
          isOpen={showLoading}
          message={'กำลังดำเนินการ'}
          mode="ios"
        />
        <IonItem>
        <IonLabel color="success" position="floating">*Username</IonLabel>
        <IonInput onIonChange={onAvatarChange} value={User_Name} placeholder="ระบุusername"></IonInput>
    </IonItem>
      
            <IonItem>
        <IonLabel color="success" position="floating">Name</IonLabel>
        <IonInput onIonChange={onFirstNameChange} value={firstname} placeholder="ระบุชื่อ"></IonInput>
    </IonItem>
    <IonItem>
        <IonLabel color="success" position="stacked">Surname </IonLabel>
        <IonInput onIonChange={onLastNameChange} value={lastname} placeholder="ระบุนามสกุล"></IonInput>
    </IonItem>
    <IonItem>
        <IonLabel color="success" position="stacked">*ชื่อผู้ใช้ (Email)</IonLabel>
        <IonInput onIonChange={onEmailChange} value={Email} type="email" placeholder="ระบุ email" ></IonInput>
    </IonItem>
    <IonItem>
        <IonLabel color="success" position="stacked">*รหัสผ่าน</IonLabel>
        <IonInput onIonChange={onPasswordChange} value={dbpasswd} type="password" placeholder="ระบุรหัสผ่าน"></IonInput>
    </IonItem>
    <IonItem>
        <IonLabel color="success" position="stacked">ยืนยันรหัสผ่าน</IonLabel>
        <IonInput  type="password" value={dbpasswd} placeholder="ระบุรหัสผ่านอีกครั้ง"></IonInput>
    </IonItem>

            </IonContent>
            <IonFooter className="ion-padding">
            <IonButton expand="block" onClick={onSave}>บันทึก</IonButton>
            </IonFooter>
        </IonPage>
        // user experience (UX)
    );
};

export default Register;