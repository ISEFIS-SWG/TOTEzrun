import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAvatar, IonItem, IonLabel, IonIcon, IonInput, IonFooter, IonButton, IonAlert, IonDatetime } from '@ionic/react';

import './Tab2.css';
import { timer } from 'ionicons/icons';
import { addActivity } from '../service/ActivityAPI';
import { RouteComponentProps } from 'react-router';
import shareValue from "./models/share";

const Tab2: React.FC<RouteComponentProps> = (props) => {

  const [showAlert, setShowAlert] = useState(false);

  let username = "pratya";
  //let walkRun = "30";
  // let startTime = "2020-03-30 17:30:07";
  // let stopTime = "2020-03-30 18:00:08";
  // let distance = "5";
  //let username = shareValue.username;
  let walkRun = shareValue.duration;
  console.log('walkrun',walkRun);
  let startTime = shareValue.startTime;
  let stopTime = shareValue.stopTime;
  let distance = shareValue.distance;

  let onSave = async () => {
    console.log('onsave  : ส่ง request บันทึกการวิ่ง');
    
    let result = await addActivity(username, walkRun, startTime, stopTime, distance);
     if (result?.data.success) {
      setShowAlert(true);
      props.history.goBack();
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
            <IonLabel><h2>เริ่มวิ่งเวลา  {startTime}</h2></IonLabel>
            
           
          </IonItem>
          <IonItem lines="none">
          <IonLabel><h2>สิ้นสุดการวิ่ง  {stopTime}</h2></IonLabel>
            
          </IonItem>
          <IonItem lines="none">
          <IonLabel><h2>รวมเวลาวิ่ง  {walkRun}</h2></IonLabel>
            
          </IonItem>
          <IonItem lines="none">
            <IonLabel><h2>ท่านวิ่งได้ระยะทาง (กิโลเมตร)</h2></IonLabel>
            <IonInput color="primary" placeholder={distance} ></IonInput>
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