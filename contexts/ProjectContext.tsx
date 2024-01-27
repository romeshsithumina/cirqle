"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Project {
  id: number;
  name: string;
}

interface ProjectContextProps {
  selectedProject: Project | undefined;
  updateSelectedProject: (selectedProject: Project) => void;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  useEffect(() => {
    // Retrieve stored project from local storage
    const storedProject = localStorage.getItem("selectedProject");
    if (storedProject) {
      setSelectedProject(JSON.parse(storedProject));
    }
  }, []);

  const updateSelectedProject = (project: Project) => {
    // Update state and store in local storage
    setSelectedProject(project);
    localStorage.setItem("selectedProject", JSON.stringify(project));
  };

  return (
    <ProjectContext.Provider value={{ selectedProject, updateSelectedProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
