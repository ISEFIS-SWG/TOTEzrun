import React,{ useState } from 'react';
import { IonSegmentButton,IonSegment,IonContent,IonItem,IonIcon,useIonViewDidEnter,
  IonRefresher,IonRefresherContent ,IonPopover,IonButton,
  IonButtons, IonHeader, IonPage, IonTitle, IonToolbar,IonAvatar,IonLabel,
  IonCardContent,IonFooter,IonCardHeader,IonCard,IonList,IonRow,IonCol} from '@ionic/react';
import Allvir from "./Showvirtualrun";
import Allactive from "./Showactive";
import { RouteComponentProps } from 'react-router';



const Tab1: React.FC<RouteComponentProps> = (props) => {
  const [segment, setSegment] = useState("all");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>History</IonTitle>
          
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
      



      <IonSegment onIonChange={(e) => setSegment(e.detail.value as any)}>
        <IonSegmentButton value="all" checked={segment === 'all'} >
        Activities
            </IonSegmentButton>
            <IonSegmentButton value="VirtualRun" checked={segment === 'VirtualRun'}>
              VirtualRun
            </IonSegmentButton>
          </IonSegment>

            
              
             {(() => { 
          switch(segment) {
            case "all": return  <Allactive/>  ;
            case "VirtualRun": return <Allvir/>;
            
            default: return <IonLabel class="ion-text-center" >  <b>บดินทร์</b> </IonLabel>
          }
        })()}

      </IonContent>
    </IonPage>
  );
};

export default Tab1;