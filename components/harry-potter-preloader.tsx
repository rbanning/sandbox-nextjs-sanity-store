"use client";

import { useRef } from "react";
import { store } from "@/store";
import { setStartupNames } from "@/store/features/harry-potter/harry-potter-searchSlice";
import { IHarryPotterName } from "@/data/harry-potter.models";


function HarryPotterPreloader({ names }: { names: IHarryPotterName[] }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setStartupNames(names));
    loaded.current = true;
  }  

  return null; //components must return something :-)
}

export default HarryPotterPreloader;