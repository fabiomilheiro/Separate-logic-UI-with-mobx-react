import React from "react";
import { observer } from "mobx-react-lite";
import { Clicks } from "./clicks.logic";

const clicks = new Clicks();

export const Clicker = observer(() => (
  <>
    <h1>Clicks</h1>
    <p>Clicks: {clicks.clicks}</p>
    <p>Left to 1000: {clicks.leftTo1000}</p>
    <p>
      <button onClick={() => clicks.addClick()}>Click</button>
    </p>
  </>
));
