import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";

const NewMemory: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/good-memories"></IonBackButton>
          </IonButtons>
          <IonTitle>New Memories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>New Memories</h2>
      </IonContent>
    </IonPage>
  );
};

export default NewMemory;
