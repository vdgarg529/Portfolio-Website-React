// src/constants/public_notes.js
import HLD_Security_Contents from '../assets/PublicContent/HLD/Security/1.Contents.md?raw';
import HLD_Security_Foundations_of_Security from '../assets/PublicContent/HLD/Security/2.Foundations of Security.md?raw';
import HLD_Security_Security_in_System_Design from '../assets/PublicContent/HLD/Security/3.Security in System Design.md?raw';

import HLD_Load_Balancing_Contents from '../assets/PublicContent/HLD/Load_Balancing/1.Contents.md?raw';

import HLD_Message_Queues_Contents from '../assets/PublicContent/HLD/Message_Queues/1.Contents.md?raw';

import HLD_Caching_Contents from '../assets/PublicContent/HLD/Caching/1.Contents.md?raw';



import project_aiNotes_td from '../assets/PublicContent/Project/1.aiNotes/1.Technical_Document.md?raw';
import project_aiNotes_techstack from '../assets/PublicContent/Project/1.aiNotes/2.Tech_Stack_Justification.md?raw';
import project_aiNotes_linebyline from '../assets/PublicContent/Project/1.aiNotes/3.Line_By_Line_Code_Explanation.md?raw';
import project_aiNotes_ques from '../assets/PublicContent/Project/1.aiNotes/4.100_Potential_Questions.md?raw';



import DBMS_Questions from '../assets/PublicContent/DBMS/00.Questions/Questions.md?raw';



export const notesData = {
  "High Level Design": {
    "1. Security": {
      "1.1. Syllabus": { content: HLD_Security_Contents },
      "1.2. Foundations of Security": { content: HLD_Security_Foundations_of_Security },
      "1.3. Security in System Design": { content: HLD_Security_Security_in_System_Design },
    },
    "2. Load Balancing": {
      "2.1. Syllabus": { content: HLD_Load_Balancing_Contents },
    },
    "3. Message Queues": {
      "3.1. Syllabus": { content: HLD_Message_Queues_Contents },
    },
    "4. Caching": {
      "4.1. Syllabus": { content: HLD_Caching_Contents },
    },

  },

  "Project": {
    "1. Note Mgmt": {
      "1.1. Technical Document": { content: project_aiNotes_td},
      "1.2. Tech Stack Justification": { content: project_aiNotes_techstack },
      "1.3. Line By Line Explaination": { content: project_aiNotes_linebyline },
      "1.4. Potential Questions": { content: project_aiNotes_ques },
    },
    "2. VLC": {
      "2.1. Syllabus": { content: "Coming Soon" },
    },
  },

  "DBMS": {
    "1. Top 100 Questions": { content: DBMS_Questions},
  },


};
