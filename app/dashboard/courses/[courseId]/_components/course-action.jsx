"use client";
import { Trash } from "lucide-react";
import { SubmitActionBtn } from "./submit-action-btn";

export const CourseActions = ({ active, onActive, onDelete }) => {
  return (
    <div className="flex items-center gap-x-2">
      <form action={onActive}>
        <SubmitActionBtn variant="outline">
          {active ? "UnPublish" : "Publish"}
        </SubmitActionBtn>
      </form>

      <form action={onDelete}>
        <SubmitActionBtn>
          <Trash className="w-4 h-4" />
        </SubmitActionBtn>
      </form>
    </div>
  );
};