import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon, useIonViewDidEnter, IonInput } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import{ add,barcode,locate, share} from "ionicons/icons";
import shareValue from "./models/share";

const Home: React.FC<RouteComponentProps> = (props) => {
  let loginvia;
  let username;
  let User_id;
  let Token;

  if(shareValue.LoginFrom===1) {
     loginvia='Direct Register'
    // username=shareValue.User_Name
    // User_id=shareValue.selflogin.User_id
     username=shareValue.User_Name
     User_id=shareValue.User_id
  }
  if(shareValue.LoginFrom===2) {
     loginvia='Facebook'
     username=shareValue.User_Name
     User_id=shareValue.User_id

     
  }
  if(shareValue.LoginFrom===3)  loginvia='Google'
  
  
  //let test=5;
//let value=shareValue;
//console.log(itemList);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
  <IonTitle>Welcome Page</IonTitle>

        </IonToolbar>
      </IonHeader>
      <IonContent >
      <IonItem>
  <IonLabel color="success" position="floating">Login From</IonLabel>
  <IonInput placeholder="loginvia" value={loginvia}> </IonInput>
    </IonItem>
    <IonItem>
  <IonLabel color="success" position="floating">Your UserName</IonLabel>
  <IonInput placeholder="UserAccount" value={username}> </IonInput>
    </IonItem>
    <IonItem>
  <IonLabel color="success" position="floating">Your ID </IonLabel>
  <IonInput placeholder="User_id" value={User_id}> </IonInput>

    </IonItem>  
      </IonContent>

    </IonPage>
  );
};

export default Home;
