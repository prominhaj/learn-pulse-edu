"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const ModuleList = ({ items, onReorder, onEdit }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [modules, setModules] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setModules(items);
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedModules = items.slice(startIndex, endIndex + 1);

    setModules(items);

    const bulkUpdateData = updatedModules.map((module) => ({
      id: module.id,
      position: items.findIndex((item) => item.id === module.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="modules">
        {(provided) => (
          <div className="!mt-2" {...provided.droppableProps} ref={provided.innerRef}>
            {modules.map((module, index) => (
              <Draggable key={module.id} draggableId={module.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 rounded-md mb-4 text-sm dark:text-slate-300 bg-slate-200 dark:bg-gray-700/80 border-slate-200 dark:border-gray-600 border text-slate-700",
                      module?.active &&
                      "bg-sky-100 dark:bg-sky-900 border-sky-200 dark:border-sky-700 text-sky-700 dark:text-sky-400"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 dark:border-r-gray-500 dark:hover:bg-gray-800 hover:bg-slate-300 rounded-l-md transition",
                        module?.active &&
                        "border-r-sky-200 dark:border-r-sky-800 hover:bg-sky-200 dark:hover:bg-sky-800"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="w-5 h-5" />
                    </div>
                    {module.title}
                    <div className="flex items-center pr-2 ml-auto gap-x-2">
                      <Badge
                        className={cn(
                          "bg-gray-500 dark:bg-gray-300",
                          module?.active && "bg-emerald-600 dark:bg-emerald-400"
                        )}
                      >
                        {module?.active ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(module.id)}
                        className="w-4 h-4 transition cursor-pointer hover:opacity-75"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
