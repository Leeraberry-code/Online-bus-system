'use client'

import React from "react";
import NavBar from "../components/NavBar";
import { ToastProvider, ToastViewport } from "../ui/use-toast"; 

export default function Page() {
  return (
    <ToastProvider>
      <React.Fragment>
        <NavBar />
        <ToastViewport />
      </React.Fragment>
    </ToastProvider>
  );
}
