"use client";

import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "./hooks/useDesigner";
import { ImSpinner2 } from "react-icons/im";

const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false); // For checking the elements of designer is ready or not

  // For deleting the element
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, //10px
    },
  });

  // For deleting the element in mobile
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10, //10px
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;

    const elements = JSON.parse(form.content);
    setElements(elements);

    const readyTimeout = setTimeout(() => setIsReady(true), 500);

    //cleanup function
    return () => clearTimeout(readyTimeout);
  }, [form, setElements]);

  //? show a loading spin if the previous elements of form are not still ready
  if (!isReady) {
    return (
      <div className=" flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className=" animate-spin h-12 w-12" />
      </div>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className=" flex flex-col w-full">
        <nav className=" flex justify-between border-b-2 gap-3 items-center">
          <h2 className=" truncate font-medium">
            <span className=" text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>

          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn />
              </>
            )}
          </div>
        </nav>

        <div className=" flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
