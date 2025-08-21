// src/constants/public_notes.js
import HLD_Security_Contents from '../assets/PublicContent/HLD/Security/1.Contents.md?raw';
import HLD_Security_Foundations_of_Security from '../assets/PublicContent/HLD/Security/2.Foundations of Security.md?raw';
import HLD_Security_Security_in_System_Design from '../assets/PublicContent/HLD/Security/3.Security in System Design.md?raw';

import HLD_Load_Balancing_Contents from '../assets/PublicContent/HLD/Load_Balancing/1.Contents.md?raw';

import HLD_Message_Queues_Contents from '../assets/PublicContent/HLD/Message_Queues/1.Contents.md?raw';

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
