import React from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { happy, sad } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { Route, Redirect } from "react-router";
import GoodMemories from "./pages/GoodMemories";
import BadMemories from "./pages/BadMemories";
import NewMemory from "./pages/NewMemory";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/good-memories">
            <GoodMemories></GoodMemories>
          </Route>
          <Route path="/bad-memories">
            <BadMemories></BadMemories>
          </Route>
          <Route path="/new-memory">
            <NewMemory></NewMemory>
          </Route>
          <Redirect to="/good-memories"></Redirect>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton href="/good-memories" tab="good">
            <IonIcon icon={happy}></IonIcon>
            <IonLabel>Good Memories</IonLabel>
          </IonTabButton>
          <IonTabButton href="/bad-memories" tab="bad">
            <IonIcon icon={sad}></IonIcon>
            <IonLabel>Bad Memories</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
