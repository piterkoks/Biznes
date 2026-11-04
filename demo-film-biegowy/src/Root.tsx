import React from "react";
import { Composition } from "remotion";
import { TwojBieg, DaneBiegacza } from "./TwojBieg";
import przyklad from "../data/biegacz.json";

export const Root: React.FC = () => (
  <Composition
    id="TwojBieg"
    component={TwojBieg}
    durationInFrames={540}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={przyklad as DaneBiegacza}
  />
);
