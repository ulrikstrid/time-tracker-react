import { configure } from "@storybook/react";

function loadStories() {
  require("../src/stories");
  require("../src/stories/Table");
  require("../src/stories/Button");
}

configure(loadStories, module);
