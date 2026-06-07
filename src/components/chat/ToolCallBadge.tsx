"use client";

import { Loader2 } from "lucide-react";

interface StrReplaceArgs {
  command?: "view" | "create" | "str_replace" | "insert" | "undo_edit";
  path?: string;
}

interface FileManagerArgs {
  command?: "rename" | "delete";
  path?: string;
  new_path?: string;
}

type ToolArgs = StrReplaceArgs | FileManagerArgs;

function getFileName(path: string): string {
  return path.split("/").filter(Boolean).pop() ?? path;
}

function getLabel(toolName: string, args: ToolArgs): string {
  const path = "path" in args && args.path ? args.path : null;
  const fileName = path ? getFileName(path) : null;

  if (toolName === "str_replace_editor") {
    const { command } = args as StrReplaceArgs;
    switch (command) {
      case "create":
        return fileName ? `Creating ${fileName}` : "Creating file";
      case "str_replace":
        return fileName ? `Editing ${fileName}` : "Editing file";
      case "insert":
        return fileName ? `Inserting into ${fileName}` : "Inserting into file";
      case "view":
        return fileName ? `Reading ${fileName}` : "Reading file";
      default:
        return fileName ? `Updating ${fileName}` : "Updating file";
    }
  }

  if (toolName === "file_manager") {
    const { command, new_path } = args as FileManagerArgs;
    switch (command) {
      case "rename":
        return new_path
          ? `Renaming ${fileName ?? path} → ${getFileName(new_path)}`
          : `Renaming ${fileName ?? path}`;
      case "delete":
        return fileName ? `Deleting ${fileName}` : "Deleting file";
      default:
        return "Managing file";
    }
  }

  return toolName;
}

interface ToolCallBadgeProps {
  toolName: string;
  args: ToolArgs;
  done: boolean;
}

export function ToolCallBadge({ toolName, args, done }: ToolCallBadgeProps) {
  const label = getLabel(toolName, args);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {done ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600 flex-shrink-0" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
