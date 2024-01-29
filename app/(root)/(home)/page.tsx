"use client";

import EmptyState from "@/components/shared/EmptyState";
import { useProject } from "@/contexts/ProjectContext";

const Page = () => {
  const { selectedProject } = useProject();

  if (!selectedProject)
    return (
      <EmptyState
        title="No Project Selected"
        subtitle="Try Selecting or Creating a new Project"
      />
    );

  return (
    <EmptyState
      title="No Issue Selected"
      subtitle="Get started by selecting or creating an issue"
    />
  );
};
export default Page;
