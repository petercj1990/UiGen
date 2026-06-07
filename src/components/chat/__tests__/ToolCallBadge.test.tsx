import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolCallBadge } from "../ToolCallBadge";

afterEach(() => {
  cleanup();
});

// --- str_replace_editor labels ---

test("shows 'Creating <filename>' for create command", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      done={false}
    />
  );
  expect(screen.getByText("Creating App.jsx")).toBeDefined();
});

test("extracts basename from nested path for create command", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/components/Button.tsx" }}
      done={false}
    />
  );
  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});

test("shows 'Editing <filename>' for str_replace command", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "str_replace", path: "/App.jsx" }}
      done={false}
    />
  );
  expect(screen.getByText("Editing App.jsx")).toBeDefined();
});

test("shows 'Inserting into <filename>' for insert command", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "insert", path: "/App.jsx" }}
      done={false}
    />
  );
  expect(screen.getByText("Inserting into App.jsx")).toBeDefined();
});

test("shows 'Reading <filename>' for view command", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "view", path: "/App.jsx" }}
      done={false}
    />
  );
  expect(screen.getByText("Reading App.jsx")).toBeDefined();
});

test("shows 'Updating <filename>' when command is undefined", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ path: "/App.jsx" }}
      done={false}
    />
  );
  expect(screen.getByText("Updating App.jsx")).toBeDefined();
});

test("shows 'Creating file' when create command has no path", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create" }}
      done={false}
    />
  );
  expect(screen.getByText("Creating file")).toBeDefined();
});

test("shows 'Updating file' when args are empty", () => {
  render(
    <ToolCallBadge toolName="str_replace_editor" args={{}} done={false} />
  );
  expect(screen.getByText("Updating file")).toBeDefined();
});

// --- file_manager labels ---

test("shows 'Renaming <old> → <new>' for rename command with both paths", () => {
  render(
    <ToolCallBadge
      toolName="file_manager"
      args={{ command: "rename", path: "/utils.ts", new_path: "/lib/helpers.ts" }}
      done={false}
    />
  );
  expect(screen.getByText("Renaming utils.ts → helpers.ts")).toBeDefined();
});

test("shows 'Renaming <filename>' for rename command with no new_path", () => {
  render(
    <ToolCallBadge
      toolName="file_manager"
      args={{ command: "rename", path: "/utils.ts" }}
      done={false}
    />
  );
  expect(screen.getByText("Renaming utils.ts")).toBeDefined();
});

test("shows 'Deleting <filename>' for delete command", () => {
  render(
    <ToolCallBadge
      toolName="file_manager"
      args={{ command: "delete", path: "/old-file.ts" }}
      done={false}
    />
  );
  expect(screen.getByText("Deleting old-file.ts")).toBeDefined();
});

test("shows 'Managing file' for file_manager with unknown command", () => {
  render(
    <ToolCallBadge toolName="file_manager" args={{}} done={false} />
  );
  expect(screen.getByText("Managing file")).toBeDefined();
});

// --- unknown tool ---

test("falls back to raw tool name for unknown tools", () => {
  render(
    <ToolCallBadge toolName="some_unknown_tool" args={{}} done={false} />
  );
  expect(screen.getByText("some_unknown_tool")).toBeDefined();
});

// --- done / in-progress visual state ---

test("shows spinner when done is false", () => {
  const { container } = render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      done={false}
    />
  );
  // Loader2 renders as an svg with the animate-spin class
  expect(container.querySelector(".animate-spin")).toBeDefined();
  // No green dot
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

test("shows green dot and no spinner when done is true", () => {
  const { container } = render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      done={true}
    />
  );
  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
});
