"use client";
import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function UpdateIncome() {
  return (
    <div>
      
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Income Details</DialogTitle>
              <DialogDescription>
                Make changes to your income transaction here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={currentData.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value={currentData.username} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleDialogSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
    </div>
  )
}

export default UpdateIncome

