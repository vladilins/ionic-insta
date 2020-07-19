import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import "./NewMemory.css";

const { Camera } = Plugins;

const NewMemory: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string;
    preview: string;
  }>();

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
    });

    if (!photo || !photo.path || !photo.webPath) {
      return;
    }

    setTakenPhoto({
      path: photo.path,
      preview: photo.webPath,
    });
    console.log(photo);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/good-memories" />
          </IonButtons>
          <IonTitle>Add New Memory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Memory Title</IonLabel>
                <IonInput type="text"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <div className="image-preview">
                {!takenPhoto && <h3>No photo chosen.</h3>}
                {takenPhoto && (
                  <img src={takenPhoto.preview} alt="preview"></img>
                )}
              </div>
              <IonButton fill="clear" onClick={takePhotoHandler}>
                <IonIcon icon={camera} slot="start"></IonIcon>
                <IonLabel>Take Photo</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonCol className="ion-text-center">
              <IonButton>Add Memory</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewMemory;
