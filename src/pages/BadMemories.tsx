import React, { useContext } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  isPlatform,
  IonFab,
  IonFabButton,
  IonRow,
  IonCol,
  IonGrid
} from '@ionic/react';
import { add } from 'ionicons/icons';

import MemoriesContext from '../data/memories-context';
import MemoriesList from '../components/MemoriesList';

const BadMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);

  const badMemories = memoriesCtx.memories.filter(
    memory => memory.type === 'bad'
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bad Memories</IonTitle>
          {isPlatform('ios') && (
            <IonButtons slot="end">
              <IonButton routerLink="/new-memory">
                <IonIcon slot="icon-only" icon={add} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {badMemories.length === 0 && (
            <IonRow>
              <IonCol className="ion-text-center">
                <h2>No bad memories found.</h2>
              </IonCol>
            </IonRow>
          )}
          <MemoriesList items={badMemories} />
        </IonGrid>
        {!isPlatform('ios') && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton routerLink="/new-memory">
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BadMemories;
