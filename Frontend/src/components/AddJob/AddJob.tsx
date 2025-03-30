import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import JobForm from "./JobForm";
import { DialogTitle } from "@radix-ui/react-dialog";

const AddJob = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>Add Job</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col">
          <DialogTitle>Add a job</DialogTitle>
          <JobForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddJob;
