import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg, IonList, IonGrid, IonInput, IonItem, IonLabel, IonButtons, IonLoading, IonCard, IonToast } from '@ionic/react';
import React, { Component, useState, FormEvent } from 'react';
import './Login.css';
//import "@codetrix-studio/capacitor-google-auth";
import { FacebookLoginResponse } from '@rdlabo/capacitor-facebook-login';
import { Plugins } from '@capacitor/core';
import { FacebookLoginButton,GoogleLoginButton } from "react-social-login-buttons";
import { RouteComponentProps } from 'react-router';
import shareValue from './models/share';
import {  getAuthen } from '../service/EmployeeAPI';

const INITIAL_STATE = {
};
let state= { ...INITIAL_STATE }
let User_Name = "";
let User_password = "";
const Login: React.FC<RouteComponentProps> = (props:any) => {
  const [showLoading, setShowLoading] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [pesanLogin, setPesanLogin] = useState("");
  let onUser_NameChange = (e:any)=>{
    console.log('User_Name '+e.target.value)
    User_Name=e.target.value;
}
let onUser_passwordChange = (e:any)=>{
    User_password=e.target.value;
}
const initialValue = [
  { id: 0,value: " --- Select a State ---" }];
const initValue = [{ }];
const [LoginArry, setLoginArry] = useState(initValue)
let LoginCheck = async()=>{
  setShowLoading(true);
  //const { history } = this.props;
  let result= await getAuthen(User_Name,User_password)
  result?.data.map((selflogin:any)=>{
    if(selflogin.User_id>0){

      shareValue.selflogin = selflogin;
      //shareValue.user=logindetail;
     // console.log('rwsult'+shareValue.selflogin[0])
      shareValue.LoginFrom=1;
      shareValue.username = User_Name;
    props.history.push('/tab4')
  }
  })
  setShowLoading(false);
} 

  let LoginCheckkkkk =async()=>{
  setShowLoading(true);
      console.log('เริ่มส่ง request ข้อมูลผูใช้');
  let result= await getAuthen(User_Name,User_password)
  setLoginArry(result?.data);
  if(result?.data){
  let itemList=LoginArry.map((logindetail:any)=>{
    shareValue.user=logindetail;
    if(logindetail.User_id>0)
    {
      console.log('sharevalue'+shareValue.user.Email);
      console.log('sharevalue'+shareValue.user.User_id);
      shareValue.user=logindetail;
      shareValue.LoginFrom=1
      props.history.push('/Home')
    } 
    
  
    return(shareValue.user)
  });
}
setShowLoading(false);
}
    let getCurrentState =async()=>{ 
    const result = await Plugins.FacebookLogin.getCurrentAccessToken();
    try {
      return result && result.accessToken;
    } catch (e) {
      return false;
    }
  }
  let ToRegisPage = async()=>{
    props.history.push('/Register')
  }
  // async signIn(): Promise<void> {
    let signIn = async()=>{
    const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];
    const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    if (result && result.accessToken) {
      shareValue.FacebookToken=result.accessToken;
      props.history.push({
        pathname: '/facebookRegis',
        state: { token: result.accessToken.token, userId: result.accessToken.userId }
      });
    } else props.history.goBack();
  }
  //async GsignIn(): Promise<void> {
    let GsignIn = async()=>{
    const result = await Plugins.GoogleAuth.signIn();
    console.info('result', result);
    if (result) {
      props.history.push({
        pathname: '/googleRegis',
        state: { name: result.name || result.displayName, image: result.imageUrl, email: result.email }
      });
    }

  }

  return (
          <IonPage>
            <IonHeader>
            <IonToolbar color="primary" mode="ios">
          <IonTitle>SMART RUN Login</IonTitle>
        </IonToolbar>
            </IonHeader >
            <IonContent class="background">
         
            <IonLoading
           
          isOpen={showLoading}
          message={'กำลังดำเนินการ'}
          mode="ios"
        />
  
       
        <br/>
      
        <IonCard mode="ios" className="ion-padding-horizontal">
       <IonInput onIonChange={onUser_NameChange}value={User_Name} placeholder="ระบุ username"></IonInput>
        </IonCard>

        <IonCard mode="ios" className="ion-padding-horizontal">
          {/* <IonInput onIonChange={onUser_passwordChange} onInput={passwordCheck} id="passwordInput" value={password} type="password" placeholder=" รหัสผ่าน" /> */}
         
          <IonInput onIonChange={onUser_passwordChange} value={User_password}  type="password" placeholder="ระบุรหัสผ่าน"></IonInput>
        </IonCard>

        <IonButton onClick={LoginCheck} className="ion-padding-horizontal" color="success" mode="ios" expand="block">
          LOGIN
        </IonButton>
              <FacebookLoginButton onClick={signIn}>
      <span>Login With Facebook </span>
    </FacebookLoginButton>
    <GoogleLoginButton onClick={GsignIn} />
            <IonRow>
            <IonCol>
            <IonButton onClick={ToRegisPage} expand="block" fill="outline" color="undefined" class="btn-color"><strong>ผู้ใช้ใหม่? ลงทะเบียน</strong></IonButton>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
            <IonButton expand="block" fill="outline" color="undefined" class="btn-color"><strong>ลืมรหัสผ่าน</strong></IonButton>
            </IonCol>
            </IonRow>  
            </IonContent>
          </IonPage>
        );
};

export default Login;

