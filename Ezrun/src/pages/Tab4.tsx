import React, { useState, useEffect } from 'react';
import { locate, laptop, time } from "ionicons/icons";
import { Plugins } from "@capacitor/core";
import GoogleMapReact from 'google-map-react';
import { RefresherEventDetail } from '@ionic/core';
import { start } from 'repl';
import { useStopwatch } from 'react-timer-hook';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButton,
  IonCol, IonRow, IonGrid, IonIcon, IonButtons, IonContent, IonLoading, useIonViewDidEnter
} from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router';
import { strict } from 'assert';
import shareValue from "./models/share";


const { Geolocation } = Plugins;
const Tab4: React.FC<RouteComponentProps> = (props) => {
  const [showLoading, setShowLoading] = useState(false);
  const [positionReady, setPositionReady] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0, speed: 0 });
  const [startPosition, setStartPosition] = useState({ lat: 0, lng: 0, time: 0 });
  const [timeStatus, setTimeStatus] = useState({ stime: 0, ftime: 0 });
  const [totalDistance, setTotalDistance] = useState(0);
  const [watchID, setWatchID] = useState(0);

  const {
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  useIonViewDidEnter(() => {
    startGetGPS();
  });

  let position1: any;
  const startGetGPS = async () => {
    console.log('**** startGetGPS ***');
    setShowLoading(false)
    let position1 = await Geolocation.getCurrentPosition().then(success)
      .catch((error) => {
        alert('Not found Position:' + error.message);
      });
  }

  let success = (position: any) => {
    setShowLoading(false);
    setPositionReady(true);
    setWatchID(position1);
    setStartPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      time: position.timestamp
    });
    setCurrentPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      speed: position.coords.speed
    });
    setTotalDistance(0);
  }
  let watch: any;
  let startWatchGPS = () => {
    console.log('*** startWatchGPS **** :');
    watch = Geolocation.watchPosition({}, (watchsuccess));
    setWatchID(watch);
  }

  let position_1 = { lat: 0, lng: 0 }
  let position_2 = { lat: 0, lng: 0, speed: 0 }
  let firstwatch = true;
  let firstcal = true;
  let sub_distance = 0;

  let watchsuccess = (position: any, error: any) => {
    setPositionReady(true);
    if (firstwatch == true) {
      setStartPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        time: position.timestamp
      });
      position_1.lat = position.coords.latitude;
      position_2.lng = position.coords.longitude;
      position_2.speed = position.coords.speed;
      firstwatch = false;
    }
    else {
      position_1.lat = position_2.lat;
      position_1.lng = position_2.lng;
    }
    setCurrentPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      speed: position.coords.speed
    });
    position_2.lat = position.coords.latitude;
    position_2.lng = position.coords.longitude;
    position_2.speed = position.coords.speed;

    console.log('speed : ', position_2.speed);

    if (firstcal == false) {
      sub_distance = sub_distance + distanceInKmBetweenEarthCoordinates(position_1, position_2);
    }
    setTotalDistance(Number(sub_distance.toFixed(2)));
    firstcal = false;
  }

  let degreesToRadians = (degrees: any) => {
    return degrees * Math.PI / 180;
  }

  let distanceInKmBetweenEarthCoordinates = (position1: any, position2: any) => {
    let Significant = 5;
    let earthRadiusKm = 6371;
    let lat1 = Number((position1.lat).toFixed(Significant));
    let lng1 = Number((position1.lng).toFixed(Significant));
    let lat2 = Number((position2.lat).toFixed(Significant));
    let lng2 = Number((position2.lng).toFixed(Significant));
    console.log('lat1 :', lat1, ' lng1 :', lng1);
    console.log('lat2 :', lat2, ' lng2 :', lng2);
    let dLat = degreesToRadians(lat2 - lat1);
    let dLon = degreesToRadians(lng2 - lng1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distancekm = earthRadiusKm * c;

    return Number(distancekm.toFixed(2));
  }



  let stopWatchGPS = (watchid: any) => {
    console.log('watch id :', watchid);
    let clearwatch = Geolocation.clearWatch(watchid);

  }

  /* เพิ่มเลขศูนย์หน้า วัน เดือน เวลา ที่เป็นเลขหลักเดียว */
  let addZero = (i: any) => {
    if (i < '10') {
      i = "0" + i;
    }
    return i;
  }

  let getDatetime = (time: any) => {
    let myDate = new Date(time);
    let d = addZero(myDate.getDate());
    let m = addZero((myDate.getMonth()) + 1);
    let y = myDate.getFullYear();
    let h = addZero(myDate.getHours());
    let min = addZero(myDate.getMinutes());
    let sec = addZero(myDate.getSeconds());
    let times = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + sec
    return times;
  };

  let durationtime = (timestart: any, timestop: any) => {
    let time = timestop - timestart;
    let mystartDate = new Date(timestart);
    let mystopDate = new Date(timestop);
    let myDate = new Date(time);
    let h = addZero(myDate.getHours()) - 7;
    let min = addZero(myDate.getMinutes());
    let sec = addZero(myDate.getSeconds());
    let times;
    if (h == 0) {
      times = min + ':' + sec
    } else {
      times = h + ':' + min + ':' + sec
    }
    return times;
  };

  let calduration = () => {
    let x = durationtime(1453467965439, 1585492636444);
    console.log(x + " น.")
  }

  let calories = (distance: any, weight: any) => {

    let cal = (weight * distance * 1.036).toFixed(2)
    console.log(cal + " Kcal")
    return cal;

  };
  let calCalories = () => {
    let x = calories(308, 78);
    console.log(x + " Kcal.")
  }

  let stopTextJSX;
  let start_time = getDatetime(timeStatus.stime);
  let current_time = getDatetime(timeStatus.ftime);
  let duration = durationtime(timeStatus.stime, timeStatus.ftime);

  // if (positionReady == true) {
  //   stopTextJSX = <p>
  //     {/* S_LAT = {startPosition.lat} <br></br>
  //     LNG = {startPosition.lng} <br></br>
  //     <br></br>
  //     C_LAT = {currentPosition.lat} <br></br>
  //     LNG = {currentPosition.lng} <br></br>
  //     <br></br> */}
  //     {/* Start Time = {start_time} <br></br>
  //     Current Time = {current_time}<br></br> */}
  //     {totalDistance}
  //     {/* Duration = {duration}<br></br> */}
  //     {/* WatchGPS_ID = {watchID} */}
  //     </p>
  // }


  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Easy Running</IonTitle>

        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonGrid>


          <IonRow  >
            <IonCol >
              <div style={{ fontSize: '100px', textAlign: "center" }}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-self-center">

            <IonCol className="ion-align-self-center"	> <IonButton size="large" color="success" onClick={() => {
              setTimeStatus({
                stime: new Date().getTime(),
                ftime: new Date().getTime()
              });
              startWatchGPS();
              start();
            }}>Start</IonButton>  </IonCol>
            <IonCol className="ion-align-self-center">   <IonButton size="large" color="danger" onClick={() => {
              setTimeStatus({
                stime: timeStatus.stime,
                ftime: new Date().getTime()
              });
              stopWatchGPS(watchID);
              pause();
            }}>Stop</IonButton>  </IonCol>
            <IonCol className="ion-align-self-center">   <IonButton size="large" color="primary" onClick={() => {
              let alltime;
              if (hours == 0) {
                alltime = String(addZero(minutes) + ':' + addZero(seconds));
              } else {
                alltime = String(addZero(hours) +':'+ addZero(minutes) + ':' + addZero(seconds));
              }
              shareValue.username = shareValue.username;
              shareValue.duration = alltime;
              shareValue.startTime = start_time;
              shareValue.stopTime = current_time;
              shareValue.distance = totalDistance;
              props.history.push("/tab2");

            }}>ส่งผล</IonButton> </IonCol>

          </IonRow>
          <IonRow  >
            <IonCol >
              <div style={{ fontSize: '30px', color : 'green'}}>
                <span>Distance {totalDistance}  Km.</span>
              </div>
            </IonCol>
          </IonRow>
          </IonGrid>
        {/* <IonLoading isOpen={showLoading} message="กำลังขอพิกัด" /> */}
      </IonContent>
    </IonPage>
  );
};
export default Tab4;