//NextJS 13 requires a Provider to connect the static (SSR) and dynamic (client)
"use client";

import { Provider } from "react-redux";
import { store } from './index';
import React from "react";

export function Providers({ children}: { children: React.ReactNode}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}