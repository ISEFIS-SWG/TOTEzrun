import React from 'react';
import { Redirect } from 'react-router';
import { IonSegmentButton,IonSegment,IonContent,IonItem,IonIcon,useIonViewDidEnter,
  IonRefresher,IonRefresherContent ,IonPopover,IonButton,
  IonButtons, IonHeader, IonPage, IonTitle, IonToolbar,IonAvatar,IonLabel,IonGrid,
  IonCardContent,IonFooter,IonCardHeader,IonCard,IonList,IonRow,IonCol} from '@ionic/react';
import { walk,bicycle} from "ionicons/icons";
import { RouteComponentProps } from 'react-router';
const Showactive: React.FC = () => {

    return (
      <IonCard className="speaker-card">
      <IonCardHeader>
        <IonItem button detail={false}  lines="none">
         <b> ต.ค. 2019 </b>
        </IonItem>
      </IonCardHeader>

      <IonCardContent class="outer-content">
        <IonList>
            <IonItem  button routerLink="/ShowDetailAc">
            <IonGrid>
              <IonRow >
                <IonCol >
                  <IonIcon icon={walk} size="100px">  </IonIcon >
                </IonCol>
                <IonCol >
                  <IonLabel>0.86 Km </IonLabel>
                </IonCol>
                <IonCol>
                <IonLabel>00:30:36" </IonLabel>
                </IonCol>
              </IonRow>

              <IonRow >
                <IonCol >
                 
                </IonCol>
                <IonCol >
                 
                </IonCol>
                <IonCol>
                <IonLabel>จ.22/1/20 </IonLabel>
                </IonCol>
              </IonRow>

              </IonGrid>
            </IonItem>
          
         
        </IonList>

        <IonList>
            <IonItem button >
            <IonGrid>
              <IonRow >
                <IonCol >
                  <IonIcon icon={bicycle} size="100px">  </IonIcon >
                </IonCol>
                <IonCol >
                  <IonLabel>8.86 Km </IonLabel>
                </IonCol>
                <IonCol>
                <IonLabel>01:20:36" </IonLabel>
                </IonCol>
              </IonRow>

              <IonRow >
                <IonCol >                
                </IonCol>
                <IonCol >            
                </IonCol>
                <IonCol>
                <IonLabel>อ.25/1/20 </IonLabel>
                </IonCol>
              </IonRow>

              </IonGrid>
            </IonItem>         
        
        </IonList>
      </IonCardContent>  



      <IonCardHeader>
        <IonItem button detail={false}  lines="none">
         <b> ธ.ค. 2019 </b>
        </IonItem>
      </IonCardHeader>

      <IonCardContent class="outer-content" >
        <IonList >
            <IonItem  lines="none">
            <IonGrid >
              <IonRow >
                <IonCol >
                  <IonIcon icon={walk} size="100px">  </IonIcon >
                </IonCol>
                <IonCol >
                  <IonLabel>0.86 Km </IonLabel>
                </IonCol>
                <IonCol>
                <IonLabel>00:30:36" </IonLabel>
                </IonCol>
              </IonRow>
              </IonGrid>
            </IonItem>
          
          <IonItem  >
          <IonGrid  >
              <IonRow >
                <IonCol >
                 
                </IonCol>
                <IonCol >
                 
                </IonCol>
                <IonCol>
                <IonLabel>จ.22/1/20 </IonLabel>
                </IonCol>
              </IonRow>
              </IonGrid>
          </IonItem>
        </IonList>

        <IonList>
            <IonItem  lines="none">
            <IonGrid>
              <IonRow >
                <IonCol >
                  <IonIcon icon={bicycle} size="100px">  </IonIcon >
                </IonCol>
                <IonCol >
                  <IonLabel>8.86 Km </IonLabel>
                </IonCol>
                <IonCol>
                <IonLabel>01:20:36" </IonLabel>
                </IonCol>
              </IonRow>
              </IonGrid>
            </IonItem>         
          <IonItem >
          <IonGrid>
              <IonRow >
                <IonCol >                
                </IonCol>
                <IonCol >            
                </IonCol>
                <IonCol>
                <IonLabel>อ.25/1/20 </IonLabel>
                </IonCol>
              </IonRow>
              </IonGrid>
          </IonItem>
        </IonList>
      </IonCardContent>  




    </IonCard>
      

// test 






    );
};

export default Showactive;