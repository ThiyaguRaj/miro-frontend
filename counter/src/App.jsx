import React from "react";
import ReactDOM from "react-dom";
import { Counter } from "./components/Counter";
import { ObButton } from "./components/ObUik";
import ObSlider from "./components/ObUik/ObSlider";
import "./index.scss";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <Counter 
      title="What is your refund policy?"
      content="If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked." 
    />
    <ObButton type="button" className="secondary-outline bg-red-300 p-3">My button</ObButton>
    <ObSlider.SliderDialog className="max-w-3xl">
      <ObSlider.Header className={"border-b bg-red-400 px-4 py-3"}>
        <ObSlider.Title>This is title</ObSlider.Title>
      </ObSlider.Header>
      <ObSlider.Body>
        <ObSlider.Title className={"text-red-500"}>This is Body title</ObSlider.Title>
      </ObSlider.Body>
    </ObSlider.SliderDialog>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
