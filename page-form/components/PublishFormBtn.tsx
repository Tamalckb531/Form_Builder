import React from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";
import { AlertDialog } from "./ui/alert-dialog";

const PublishFormBtn = () => {
  return (
    <AlertDialog>
      <Button className=" gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
        <MdOutlinePublish className=" h-4 w-4" />
        Publish
      </Button>
    </AlertDialog>
  );
};

export default PublishFormBtn;
