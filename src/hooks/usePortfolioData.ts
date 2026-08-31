import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  experienceData as defaultExperience,
  educationData as defaultEducation,
  skillsData as defaultSkills,
  projectsData as defaultProjects,
  certificationsData as defaultCertifications,
  leadershipData as defaultLeadership
} from '../data';

export const usePortfolioData = () => {
  const [data, setData] = useState({
    experience: defaultExperience,
    education: defaultEducation,
    skills: defaultSkills,
    projects: defaultProjects,
    certifications: defaultCertifications,
    leadership: defaultLeadership
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'portfolio', 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Merge fetched data with default to ensure no missing fields break the UI
          setData((prev) => ({
            ...prev,
            ...docSnap.data()
          }));
        }
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};
