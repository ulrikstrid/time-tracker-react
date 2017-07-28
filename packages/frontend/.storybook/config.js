import { configure } from "@storybook/react";

function loadStories() {
  require("../src/stories");
  require("../src/stories/Table");
}

configure(loadStories, module);
