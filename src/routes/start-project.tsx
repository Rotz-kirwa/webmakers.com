import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/start-project")({
  beforeLoad: () => {
    throw redirect({
      to: "/describe-your-idea",
    });
  },
});
