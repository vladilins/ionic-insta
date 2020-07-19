import React, { useState, useRef, useContext } from 'react';
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
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { camera } from 'ionicons/icons';
import {
  Plugins,
  CameraResultType,
  CameraSource,
  FilesystemDirectory,
  Capacitor
} from '@capacitor/core';
import { base64FromPath } from '@ionic/react-hooks/filesystem';
import { useHistory } from 'react-router-dom';

import MemoriesContext from '../data/memories-context';
import './NewMemory.css';

const { Camera, Filesystem } = Plugins;

const NewMemory: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined;
    preview: string;
  }>();
  const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>(
    'good'
  );

  const memoriesCtx = useContext(MemoriesContext);

  const titleRef = useRef<HTMLIonInputElement>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const selectMemoryTypeHandler = (event: CustomEvent) => {
    const selectedMemoryType = event.detail.value;
    setChosenMemoryType(selectedMemoryType);
  };

  const openFilePicker = () => {
    filePickerRef.current!.click();
  };

  const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target!.files![0];
    const fr = new FileReader();
    fr.onload = () => {
      setTakenPhoto({
        path: undefined,
        preview: fr.result!.toString()
      });
    };
    fr.readAsDataURL(file);
    
  };

  const takePhotoHandler = async () => {
    if (!Capacitor.isPluginAvailable('Camera')) {
      openFilePicker();
      return;
    }
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
        width: 500
      });

      if (!photo || !photo.webPath) {
        return;
      }

      setTakenPhoto({
        path: photo.path,
        preview: photo.webPath
      });
    } catch (error) {
      openFilePicker();
    }
  };

  const addMemoryHandler = async () => {
    const enteredTitle = titleRef.current?.value;

    if (
      !enteredTitle ||
      enteredTitle.toString().trim().length === 0 ||
      !takenPhoto ||
      !chosenMemoryType
    ) {
      return;
    }

    const fileName = new Date().getTime() + '.jpeg';

    const base64 = await base64FromPath(takenPhoto!.preview);
    Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: FilesystemDirectory.Data
    });

    memoriesCtx.addMemory(
      fileName,
      base64,
      enteredTitle.toString(),
      chosenMemoryType
    );
    history.length > 0 ? history.goBack() : history.replace('/good-memories');
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
                <IonInput type="text" ref={titleRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSelect
                onIonChange={selectMemoryTypeHandler}
                value={chosenMemoryType}
              >
                <IonSelectOption value="good">Good Memory</IonSelectOption>
                <IonSelectOption value="bad">Bad Memory</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <div className="image-preview">
                {!takenPhoto && <h3>No photo chosen.</h3>}
                {takenPhoto && <img src={takenPhoto.preview} alt="Preview" />}
              </div>
              <IonButton fill="clear" onClick={takePhotoHandler}>
                <IonIcon icon={camera} slot="start"></IonIcon>
                <IonLabel>Take Photo</IonLabel>
              </IonButton>
              <input
                type="file"
                hidden
                ref={filePickerRef}
                onChange={pickFileHandler}
              />
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonCol className="ion-text-center">
              <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewMemory;
