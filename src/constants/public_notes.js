// src/constants/public_notes.js
import HLD_Security_Contents from '../assets/PublicContent/HLD/Security/1.Contents.md?raw';
import HLD_Security_Foundations_of_Security from '../assets/PublicContent/HLD/Security/2.Foundations of Security.md?raw';
import HLD_Security_Security_in_System_Design from '../assets/PublicContent/HLD/Security/3.Security in System Design.md?raw';

export const notesData = {
  "High Level Design": {
    "Security": {
      "Syllabus": { content: HLD_Security_Contents },
      "Foundations of Security": { content: HLD_Security_Foundations_of_Security },
      "Security in System Design": { content: HLD_Security_Security_in_System_Design },
    },

  },

  "Dummy Subject": {
    "Topic Name 1": { content: HLD_Security_Contents },
    "Topic Name 2": {
      "Deep Subtopic": {
        "Example": { content: HLD_Security_Contents },
      },
    },
  },
};
