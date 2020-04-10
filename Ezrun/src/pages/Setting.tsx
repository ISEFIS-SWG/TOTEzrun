import React from 'react';
import { IonMenu,IonBackButton,IonLabel,IonItem,IonMenuToggle,IonList,IonListHeader, IonButtons,IonIcon, IonHeader, IonPage, IonToolbar, IonTitle, IonContent,IonButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { exit,backspace,arrowRoundBack, person } from "ionicons/icons";
import { createEmployee } from '../service/UserAPI';





const SettingPage: React.FC<RouteComponentProps> = (props) => {



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
                        <IonButton onClick={()=>{props.history.goBack()}} > 
                        <IonIcon icon={arrowRoundBack} slot="icon-only"></IonIcon> 
                        </IonButton>
                    </IonButtons>
          <IonTitle>Setting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">


        
        <IonList>
          <IonListHeader><b>Account</b></IonListHeader>
          
          <IonItem  button onClick={()=>{props.history.push("/tab3/Editprofile")}}>
            <IonIcon slot="start" icon={person} color="primary"/>
            <IonLabel >Edit Profile</IonLabel>
          </IonItem>
        
          <IonItem button>
            <IonIcon slot="start" icon={exit} color="primary" />
            <IonLabel >Log Out</IonLabel>
          </IonItem>

        </IonList>
       
      
      </IonContent>
    </IonPage>
  )
}

export default SettingPage;