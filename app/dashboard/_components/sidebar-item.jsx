"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const SidebarItem = ({ icon: Icon, label, href }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 dark:text-slate-300 text-sm font-[500] pl-6 transition-all hover:text-slate-600 dark:hover:bg-slate-500/20 hover:bg-slate-300/20",
        isActive &&
        "text-emerald-600 bg-emerald-200/20 hover:bg-emerald-200/20 hover:text-emerald-600"
      )}
    >
      <div className="flex items-center py-4 gap-x-2">
        <Icon
          size={22}
          className={cn("text-slate-500 dark:text-slate-300", isActive && "text-emerald-600 dark:text-emerald-500")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-emerald-600 dark:border-emerald-500 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
