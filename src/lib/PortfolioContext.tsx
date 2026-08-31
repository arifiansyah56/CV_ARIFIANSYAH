import React, { createContext, useContext } from 'react';
import {
  experienceData as defaultExperience,
  educationData as defaultEducation,
  skillsData as defaultSkills,
  projectsData as defaultProjects,
  certificationsData as defaultCertifications,
  leadershipData as defaultLeadership
} from '../data';

export const PortfolioContext = createContext({
  experienceData: defaultExperience,
  educationData: defaultEducation,
  skillsData: defaultSkills,
  projectsData: defaultProjects,
  certificationsData: defaultCertifications,
  leadershipData: defaultLeadership
});

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider: React.FC<{ children: React.ReactNode, data: any }> = ({ children, data }) => {
  return (
    <PortfolioContext.Provider value={{
      experienceData: data?.experience || defaultExperience,
      educationData: data?.education || defaultEducation,
      skillsData: data?.skills || defaultSkills,
      projectsData: data?.projects || defaultProjects,
      certificationsData: data?.certifications || defaultCertifications,
      leadershipData: data?.leadership || defaultLeadership
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
