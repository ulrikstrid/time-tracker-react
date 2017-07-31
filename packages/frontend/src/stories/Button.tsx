import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Button, IconButton } from "../primitives/Button";
import "../index.css";

const trashCanSVG = require("../svg/bin.svg");

storiesOf("primitives", module).add("Button", () => {
  return <Button>Button</Button>;
});

storiesOf("primitives", module).add("IconButton", () => {
  return <IconButton src={trashCanSVG} />;
});
