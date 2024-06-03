import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function DialogDefault({ open, handleOpen, header, body, confirmText, confirmAction }) {
  return (
    <>
      <Dialog className="overflow-x-scroll" open={open} handler={handleOpen}>
        <DialogHeader>{header}</DialogHeader>
        <DialogBody>{body}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={confirmAction}>
            <span>{confirmText}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
