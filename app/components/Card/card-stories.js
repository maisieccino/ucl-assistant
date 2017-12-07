import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";
import Card from "./";
import CenterView from "../CenterView";

storiesOf("Card", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add("with text", () => (
    <Card title={text("Title", "Hello Card")}>
      {text("Text", "This is some card content")}
    </Card>
  ));
