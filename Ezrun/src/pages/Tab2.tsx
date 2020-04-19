import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAvatar, IonItem, IonLabel, IonIcon, IonInput, IonFooter, IonButton, IonAlert, IonDatetime, IonNote } from '@ionic/react';

import './Tab2.css';
import { timer } from 'ionicons/icons';
import { addActivity } from '../service/ActivityAPI';
import { RouteComponentProps } from 'react-router';
import shareValue from "./models/share";

const Tab2: React.FC<RouteComponentProps> = (props) => {

  const [showAlert, setShowAlert] = useState(false);

  let username = shareValue.username;
  let walkRun = shareValue.duration;
  let startTime = shareValue.startTime;
  let stopTime = shareValue.stopTime;
  let distance = shareValue.distance;

  let onSave = async () => {
    console.log('onsave  : ส่ง request บันทึกการวิ่ง');
    
    let result = await addActivity(username, walkRun, startTime, stopTime, distance);
     if (result?.data.success) {
      setShowAlert(true);
      props.history.push("/ShowDetailAc");
      // props.history.goBack();ShowDetailAc
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><h1>ส่งผลการวิ่ง</h1></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAvatar className="avatar">
          <img src={shareValue.selflogin.Picture} />
        </IonAvatar>
        <IonItem lines="none">
            <IonLabel>เริ่มวิ่งเวลา</IonLabel>
            <IonNote slot = "end" color = "primary">{startTime}</IonNote>
          </IonItem>
          <IonItem lines="none">
          <IonLabel>สิ้นสุดการวิ่ง</IonLabel>
          <IonNote slot = "end" color = "primary">{stopTime}</IonNote> 
          </IonItem>
          <IonItem lines="none">
          <IonLabel>รวมเวลาวิ่ง</IonLabel>
          <IonNote slot = "end" color = "primary">{walkRun}</IonNote> 
          </IonItem>
          <IonItem lines="none">
            <IonLabel>ท่านวิ่งได้ระยะทาง(กิโลเมตร)</IonLabel>
            <IonNote slot = "end" color = "primary">{distance}</IonNote>
          </IonItem>
      
      </IonContent>
      <IonFooter className="ion-padding">

        <IonButton onClick={onSave} expand="full" shape="round" type="submit">บันทึก</IonButton>
        <IonButton onClick={()=>props.history.goBack()} expand="full" shape="round">ยกเลิก</IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'ส่งผลการวิ่ง'}
          subHeader={'บันทึกเรียบร้อยแล้ว'}
          message={'ขอบคุณครับ'}
          buttons={['ตกลง']}
        />

      </IonFooter>
      <br>
      </br>
    </IonPage>
  );
};

export default Tab2;