import React from 'react';
import { Redirect, Route,Switch } from 'react-router-dom';
import {CSSTransition,TransitionGroup} from 'react-transition-group' ;
import "./cssfile/App.css";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { apps, flash, person,list } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Setting from './pages/Setting';
import Editprofile from './pages/Editprofile';
import Details from './pages/Details';
import ShowDetailAc from './pages/ShowDetailAc';
import Login from './pages/Login';
import Register from './pages/Register';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet >
          <Route path="/tab1" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/tab2/details" component={Details} />
          <Route path="/tab3" component={Tab3} />    
          <Route path="/tab4" component={Tab4} />
          <Route path="/Setting" component={Setting} />
          <Route path="/Editprofile" component={Editprofile}/>
          <Route path="/" render={() => <Redirect to="/Login" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" >
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={list} />
            
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon icon={flash} />
           
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={person} />
            
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      

      <Route render ={({location})=>(

            <TransitionGroup>
                <CSSTransition 
                key={location.key}
                timeout={450}
                classNames="fade"
                >
                  <Switch location={location}>
                            
                          <Route path="/Setting" component={Setting} />
                          <Route path="/Login" component={Login} />
                          <Route path="/ShowDetailAc" component={ShowDetailAc} />
                          <Route path="/Register" component={Register} />
                          
                  </Switch>
                </CSSTransition>
            </TransitionGroup>
      )} />

     

    </IonReactRouter>
  </IonApp>
);

export default App;
