import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonBackButton, IonButtons, IonIcon } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import shareValue from './models/share';
import {close} from "ionicons/icons"

const DetailPage: React.FC<RouteComponentProps> = (props) => {
console.log('คนที่ถูกเลือกจากหน้าแรก'+shareValue.selected)
let employee=shareValue.selected;
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot='end'>
                <IonButton onClick={()=>{props.history.goBack()}}>
                <IonIcon icon={close} slot='icon-only'></IonIcon></IonButton>
            </IonButtons>
            
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>{employee.firstname}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                UI goes here...
            </IonContent>
        </IonPage>
    );
};

export default DetailPage;