import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import LoginView from "./../pages/Login/LoginView";

storiesOf("Login View", module)
  .addDecorator(story => story())
  .add("Simple Input", () => {
    return <LoginView />;
  });
