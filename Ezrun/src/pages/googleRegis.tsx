import { IonContent, IonText, IonRow, IonItem, IonThumbnail, IonLabel, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import React, { Component } from 'react';
import './Login.css';
import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import shareValue from './models/share';

const INITIAL_STATE = {
  loggedIn: true,
  user: {}
};

class googleRegis extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async signOut(): Promise<void> {
    const { history } = this.props;
    await Plugins.GoogleAuth.signOut();
    history.goBack();
  }
  GoToHome() {
    const { history } = this.props;
    //history.push('/home');

    history.push({
        pathname: '/home',
        state: { name: this.state.user.name}
      });
  }
  async getUserInfo() {
    this.setState({
      user: {
        name: this.props.location.state.name,
        image: this.props.location.state.image,
        email: this.props.location.state.email
      }
    })
  }

  render() {
    {shareValue.facebook=this.state.user}
    {shareValue.LoginFrom=3}
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Logged in ... </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">

        <IonRow>
            <IonCol className="text-center">
              <IonText className="title">
                ยินดีต้อนรับ
              </IonText>
            </IonCol>
          </IonRow>

          {this.state.user.name &&
            <IonItem>
              <IonThumbnail slot="start">
                <img src={this.state.user.image} />
              </IonThumbnail>
              <IonLabel>
                <h3>{this.state.user.name}</h3>
                <p>{this.state.user.email}</p>
              </IonLabel>
            </IonItem>
          }
          <IonButton className="login-button" onClick={ () => this.GoToHome()} expand="full" fill="solid" color="primary">
            เริ่มออกกำลังกายกันได้แล้ว
        </IonButton>
          {/* <IonButton className="login-button" onClick={() => this.signOut()} expand="full" fill="solid" color="danger">
            Logout from Google
        </IonButton> */}
        </IonContent>
      </IonPage>
    )
  }
}

export default googleRegis;
