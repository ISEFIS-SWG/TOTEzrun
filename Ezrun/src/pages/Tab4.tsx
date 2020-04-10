import React, { useState, useEffect } from 'react';
import { locate, laptop, time } from "ionicons/icons";
import { Plugins } from "@capacitor/core";
import GoogleMapReact from 'google-map-react';
import { RefresherEventDetail } from '@ionic/core';
import { start } from 'repl';
import { useStopwatch } from 'react-timer-hook';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton,
  IonCol,IonRow,IonGrid, IonIcon, IonButtons, IonContent, IonLoading, useIonViewDidEnter } from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router';
import { strict } from 'assert';
import shareValue from "./models/share";


const { Geolocation } = Plugins;
const Tab4: React.FC<RouteComponentProps> = (props) => {
  const [showLoading, setShowLoading] = useState(false);
  const [positionReady, setPositionReady] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0, acc: 0, time: 0 });
  const [startPosition, setStartPosition] = useState({ lat: 0, lng: 0, acc: 0, time: 0 });
  const [startReady, setStartReady] = useState(true);
  const [startStatus, setStartStatus] = useState({ time: 0 });
  const [totalDistance, setTotalDistance] = useState(0);

  const {
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,

    reset,
  } = useStopwatch({ autoStart: false });

  let onMapLoad = (map: any, mapsAPI: any) => {
    let directionsService = new mapsAPI.DirectionsService();
    let directionsRenderer = new mapsAPI.DirectionsRenderer();
    directionsRenderer.setMap(map)
    let start = { lat: 9.1106153, lng: 99.3018452 };

    let end = { lat: 6.9506242, lng: 100.41277989999999 };

    var waypts = [7.669402, 100.022582]

    let request = {
      origin: end,
      destination: end,
      waypoints: [
        {
          location: "7.0451252, 100.1912893",
          stopover: true
        },
        {
          location: "7.003344, 100.326394",
          stopover: true
        }
      ],
      optimizeWaypoints: true,
      travelMode: 'WALKING'

    };

    directionsService.route(request, function (result: any, status: any) {

      if (status == 'OK') {
        directionsRenderer.setDirections(result);
        let route = result.routes[0];

        var totalDist = 0;

        for (let i = 0; i < route.legs.length; i++) {
          console.log('directionService', route.legs[i].distance.text)
          totalDist += route.legs[i].distance.value;
        }


        let dis1 = route.legs[route.legs.length - 1].distance.value / 1000; // distance : km.
        console.log(dis1 + ' km.')
        let weight = 78 // kg.
        let cal = weight * dis1 * 1.036
        console.log(cal.toFixed(2) + " Kcal")
      }
    });
    let trafficLayer = new mapsAPI.TrafficLayer();
  }

  useIonViewDidEnter(() => {

    

  });



  const startGetGPS = async () => {
    console.log('Getting...startGetGPS');
    setShowLoading(true);
    let position1 = await Geolocation.getCurrentPosition();
    setShowLoading(false);
    setPositionReady(true);
    
    start();
    setCurrentPosition({
      lat: position1.coords.latitude,
      lng: position1.coords.longitude,
      acc: position1.coords.accuracy,
      time: position1.timestamp
    });

    if (startReady == true) {
      setStartStatus({
        time: position1.timestamp
      })
      setStartPosition({
        lat: position1.coords.latitude,
        lng: position1.coords.longitude,
        acc: position1.coords.accuracy,
        time: position1.timestamp
      })
      setStartReady(false);
    }
    // let lat = position1.coords.latitude;
    // let lng = position1.coords.longitude;
    console.log('Current startGetGPS', startPosition.lat, startPosition.lng);
    // startWatchGPS();
    
  }
  const getDistance = async () => {
    console.log('Getting geolocation....getDistance');
    setShowLoading(true);
    let position1 = await Geolocation.getCurrentPosition();
    setShowLoading(false);
    setPositionReady(true);
    setCurrentPosition({
      lat: position1.coords.latitude,
      lng: position1.coords.longitude,
      acc: position1.coords.accuracy,
      time: position1.timestamp
    });
    let lat = position1.coords.latitude;
    let lng = position1.coords.longitude;

    let googleMap;
    if (positionReady) {
      googleMap = (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyATDm0MlJIxUXoIU56PIOk3aY26XXs6ul0' }}
          defaultCenter={currentPosition}
          defaultZoom={15}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => { onMapLoad(map, maps) }} >
        </GoogleMapReact>
      )
    }
  }
  let watch1;
  let startWatchGPS = () => {
    console.log('Watching geolocation...startWatchGPS');
    setShowLoading(true);
    watch1 = Geolocation.watchPosition({}, (position, error) => {
      console.log('new position startWatchGPS', position);
      setShowLoading(false);
      setPositionReady(true);
      setStartPosition({
        lat: currentPosition.lat,
        lng: currentPosition.lng,
        acc: currentPosition.acc,
        time: currentPosition.time
      })
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        acc: position.coords.accuracy,
        time: position.timestamp
      })
    }
    );
  }
   

 


  let findDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    let R = 6373; // km
    let dLat = toRad((lat2 - lat1));
    let dLon = toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      toRad(Math.cos(lat1)) * toRad(Math.cos(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    function toRad(Value: any) {
      /** Converts numeric degrees to radians */
      return Value * Math.PI / 180;
    }
    /* ทศนิยม 2 ตำแหน่ง */
    let d_round_to_2nd = Number(d.toFixed(2));
    return d_round_to_2nd;
  };

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
    let m = addZero(myDate.getMonth());
    let y = myDate.getFullYear();
    let h = addZero(myDate.getHours());
    let min = addZero(myDate.getMinutes());
    let sec = addZero(myDate.getSeconds());
    let times = d + '-' + m + '-' + y + ' ' + h + ':' + min + ':' + sec
    console.log('DateTime', times);
    return times;
  };

  let durationtime = (timestart: any, timestop: any) => {
    let time = timestop - timestart;
    let mystartDate = new Date(timestart);
    let mystopDate = new Date(timestop);
    let myDate = new Date(time);
    // //let d = myDate.getDate();
    // let m = myDate.getMonth();
    // let y = myDate.getFullYear();
    let h = addZero(myDate.getHours())-7;
    let min = addZero(myDate.getMinutes());
    let sec = addZero(myDate.getSeconds());
    let times;
    if (h == 0) {
      times = min + ':' + sec
    } else {
      times = h + ':' + min + ':' + sec
    }
    
    console.log('Time Start :', mystartDate);
    console.log('Time Stop :', mystopDate);
    console.log('Diff Time :', h, ':', min, ':', sec);
    console.log(times)
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

  let startTextJSX;

  if (positionReady == true) {
    startTextJSX = <p>{currentPosition.lat},{currentPosition.lng},{currentPosition.time}</p>
  }
  else {
    startTextJSX = <p>กดปุ่มบนขวาเพื่อระบุพิกัดของเครื่อง</p>
  }
  let stopTextJSX;
  let distanceTextJSX;

  let starttime = getDatetime(startStatus.time);
  let stoptime = getDatetime(currentPosition.time);
  let duration = durationtime(startStatus.time,currentPosition.time);
  let distance = findDistance(startPosition.lat, startPosition.lng, currentPosition.lat,currentPosition.lng);
  
  if (positionReady == true) {


    stopTextJSX = <p>LastPosition = {startPosition.lat}<br></br>
                    latitude = {startPosition.lng}<br></br>
                    Time = {starttime}<br></br>
                    CurrentPosition = {currentPosition.lat}<br></br>
                    latitude = {currentPosition.lng}<br></br>
                    timestamp = {stoptime}<br></br>
                    duration = {duration}</p>

    distanceTextJSX = <p>totalDistance = {distance}</p>
  } else {
    stopTextJSX = <p>กดปุ่มบนขวาเพื่อระบุพิกัดของเครื่อง</p>
  }
  let googleMap;
  if (positionReady) {
    googleMap = (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyATDm0MlJIxUXoIU56PIOk3aY26XXs6ul0' }}
        defaultCenter={currentPosition}
        defaultZoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => { onMapLoad(map, maps) }} >
      </GoogleMapReact>
    )
  }
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

  <IonCol className="ion-align-self-center"	> <IonButton size="large" color="dark" onClick={startGetGPS}>Start</IonButton>  </IonCol>
  <IonCol className="ion-align-self-center">   <IonButton size="large" color="dark" onClick={()=>{
       // startGetGPS();

      let alltime = hours+minutes+seconds;
       
        shareValue.duration = alltime;
    
        shareValue.startTime = starttime;
        shareValue.stopTime = stoptime;
        shareValue.distance = distance;
        pause();
      }}>Stop</IonButton>  </IonCol>
  <IonCol className="ion-align-self-center">   <IonButton size="large" color="dark"  onClick={()=>{props.history.push("/tab2")}}>ส่งผล</IonButton> </IonCol>

</IonRow>
</IonGrid>




        <body >
          <div style={{ height: '90vh', width: '100%' }}>
            {/* {startTextJSX} */}
            {stopTextJSX}
            {distanceTextJSX}
            {/* {positionTextJSX} */}
            {/* {googleMap}  */}
            {/* {DistanceTextJSX} */}
          </div>
        </body>
        <IonLoading isOpen={showLoading} message="กำลังขอพิกัด" />
      </IonContent>
    </IonPage>
  );
};
export default Tab4;