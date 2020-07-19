import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

const NewMemory: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
