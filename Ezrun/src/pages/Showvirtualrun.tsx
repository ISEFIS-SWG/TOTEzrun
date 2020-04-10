import {IonLabel,IonAvatar, IonItem,IonButton,IonList,IonListHeader,IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';


interface OwnProps {

    hide: boolean;
  }
  
  

const Showdetailrun: React.FC = () => {
    
    

  

    return (


        <IonList>
        <IonListHeader>
          งานวิ่งที่คุณลงทะเบียนไว้
        </IonListHeader>
        <IonItem>
          <IonAvatar slot="start">
            <img src="./avatar-finn.png"></img>
          </IonAvatar>
          <IonLabel>
            <h2>งานญว.</h2>
            <h3>เริ่มวันที่</h3>
            <p>สถานะการสมัคร</p>
            <p> <IonButton color="success">ชำระเงินแล้ว รอรับเสื้อ</IonButton></p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonAvatar slot="start">
            <img src="./avatar-han.png"></img>
          </IonAvatar>
          <IonLabel>
            <h2>งานอบต</h2>
            <h3>เริ่มวันที่ 15/20/1999</h3>
            <p>สถานะการสมัคร</p>
            <p> <IonButton color="danger">ยังไม่ชำระเงิน</IonButton></p>
          </IonLabel>
        </IonItem>
      </IonList>
       
    );
};

export default Showdetailrun;