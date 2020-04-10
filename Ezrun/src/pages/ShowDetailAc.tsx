import {IonButtons,IonIcon,IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { arrowRoundBack,bicycle} from "ionicons/icons";
import { RouteComponentProps } from 'react-router';
const ShowDetailAc: React.FC<RouteComponentProps> = (props)  => {

    return (
        <IonPage>
            <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" >
            <IonButton  onClick={() => props.history.goBack()} >
              <IonIcon icon={arrowRoundBack} slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
            <IonContent className="ion-padding">
                Map
            </IonContent>
            <IonContent className="ion-padding">
                Static
            </IonContent>
            <IonContent className="ion-padding">
                Summary
            </IonContent>
        </IonPage>
    );
};

export default ShowDetailAc;