// src/constants/public_notes.js
import HLD_Security_Contents from '../assets/PublicContent/HLD/Security/1.Contents.md?raw';
import HLD_Security_Foundations_of_Security from '../assets/PublicContent/HLD/Security/2.Foundations of Security.md?raw';
import HLD_Security_Security_in_System_Design from '../assets/PublicContent/HLD/Security/3.Security in System Design.md?raw';
import HLD_Load_Balancing_Contents from '../assets/PublicContent/HLD/Load_Balancing/1.Contents.md?raw';
import HLD_Message_Queues_Contents from '../assets/PublicContent/HLD/Message_Queues/1.Contents.md?raw';
import HLD_Caching_Contents from '../assets/PublicContent/HLD/Caching/1.Contents.md?raw';


import DBMS_Questions from '../assets/PublicContent/DBMS/00.Questions/Questions.md?raw';
import DBMS_Syllabus from '../assets/PublicContent/DBMS/Syllabus.md?raw';
import DBMS_Intro from '../assets/PublicContent/DBMS/1.Introduction/Introduction.md?raw';
import DBMS_Architecture from '../assets/PublicContent/DBMS/1.Introduction/Architecture.md?raw';
import DBMS_Relational_Schema from '../assets/PublicContent/DBMS/1.Introduction/Relational_Schema.md?raw';
import DBMS_fds from '../assets/PublicContent/DBMS/2. Functional_Dependecies_and_Normalization/FDs.md?raw';
import DBMS_superKeys from '../assets/PublicContent/DBMS/2. Functional_Dependecies_and_Normalization/No_of_Super_Keys.md?raw';
import DBMS_decomposition from '../assets/PublicContent/DBMS/2. Functional_Dependecies_and_Normalization/Properties_Of_Decomposition.md?raw';
import DBMS_normalization from '../assets/PublicContent/DBMS/2. Functional_Dependecies_and_Normalization/Normalization.md?raw';
import DBMS_IntroACID from '../assets/PublicContent/DBMS/3. Transaction_and_Concurrency_Control/Intro_and_ACID.md?raw';
import DBMS_schedules from '../assets/PublicContent/DBMS/3. Transaction_and_Concurrency_Control/Schedules.md?raw';
import DBMS_serializability from '../assets/PublicContent/DBMS/3. Transaction_and_Concurrency_Control/Serializablity.md?raw';
import DBMS_Noofschedules from '../assets/PublicContent/DBMS/3. Transaction_and_Concurrency_Control/No_of_Schedules.md?raw';
import DBMS_ProblemsConcurrency from '../assets/PublicContent/DBMS/3. Transaction_and_Concurrency_Control/Problems_Concurrency.md?raw';
import DBMS_Recoverability from '../assets/PublicContent/DBMS/3. Transaction_and_Concurrency_Control/Serializablity.md?raw';


import oops_Intro from '../assets/PublicContent/OOPs/1.Introduction.md?raw';
import oops_Access_Modifier from '../assets/PublicContent/OOPs/2.Access-Modifier.md?raw';
import oops_Encapsulation from '../assets/PublicContent/OOPs/3.Encapsulation.md?raw';
import oops_Constructor from '../assets/PublicContent/OOPs/4.Constructor-and-Destructor.md?raw';
import oops_Inheritance from '../assets/PublicContent/OOPs/5.Inheritance.md?raw';
import oops_Overloading from '../assets/PublicContent/OOPs/6.Overloading.md?raw';
import oops_Abstraction from '../assets/PublicContent/OOPs/7.Abstraction.md?raw';
import oops_Static from '../assets/PublicContent/OOPs/8.Static.md?raw';





import Misc_tokenTypes from '../assets/PublicContent/Misc/Token_Transmission_Types.md?raw';




import project_aiNotes_td from '../assets/PublicContent/Project/1.aiNotes/1.Technical_Document.md?raw';
import project_aiNotes_techstack from '../assets/PublicContent/Project/1.aiNotes/2.Tech_Stack_Justification.md?raw';
import project_aiNotes_linebyline from '../assets/PublicContent/Project/1.aiNotes/3.Line_By_Line_Code_Explanation.md?raw';
import project_aiNotes_ques from '../assets/PublicContent/Project/1.aiNotes/4.100_Potential_Questions.md?raw';






import typeface_commented_code from '../assets/PublicContent/typeface-Finance_Assistant/1.Commented_Code_explanation.md?raw';
import typeface_detailed_code from '../assets/PublicContent/typeface-Finance_Assistant/2.Detailed.md?raw';
import typeface_questionsNextensions from '../assets/PublicContent/typeface-Finance_Assistant/3.Questions_and_Extensions.md?raw';
import typeface_Extensions1 from '../assets/PublicContent/typeface-Finance_Assistant/4.Extension_Code.md?raw';
import typeface_Extension0 from '../assets/PublicContent/typeface-Finance_Assistant/5.Interview_Friendly_Extensions.md?raw';



import tmux_intro from '../assets/PublicContent/tmux/1.Intro.md?raw';
import tmux_session from '../assets/PublicContent/tmux/2.Session_Management.md?raw';
import tmux_window from '../assets/PublicContent/tmux/3.Window_Management.md?raw';
import tmux_panes from '../assets/PublicContent/tmux/4.Panes_Management.md?raw';




import linux_mount from '../assets/PublicContent/linux/2.Mount_Drive.md?raw';
import linux_ls from '../assets/PublicContent/linux/1.ls.md?raw';



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

  "tmux": {
    "1. Intro": {content : tmux_intro},
    "2. Session Management": {content : tmux_session},
    "3. Window Management": {content : tmux_window},
    "4. Panes Management": {content : tmux_panes},
  },
  "linux": {
    "1. ls": {content : linux_ls},
    "2. Mounting": {content : linux_mount},

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
    "1. Syllabus": { content: DBMS_Syllabus},
    "2. Top 100 Questions": { content: DBMS_Questions},
    "3. Introduction": {
      "3.1. Keywords": { content: DBMS_Intro},
      "3.2. Architecture": { content: DBMS_Architecture},
      "3.3. Relational Schema": { content: DBMS_Relational_Schema},
    },
    "4. Fds & Normalization": {
      "4.1. Fds": { content: DBMS_fds},
      "4.2. Count Of Super Keys": { content: DBMS_superKeys},
      "4.3. Decomposition": { content: DBMS_decomposition},
      "4.4. Normalization": { content: DBMS_normalization},
    },
    "5. ACID & Concurrency": {
      "5.1. Introduction and ACID": { content: DBMS_IntroACID},
      "5.2. Schedules": { content: DBMS_schedules},
      "5.3. Serializability": { content: DBMS_serializability},
      "5.4. No Of Schedules": { content: DBMS_Noofschedules},
      "5.5. Problems with concurrency": { content: DBMS_ProblemsConcurrency},
      "5.6. Recoverability": { content: DBMS_Recoverability},

    },
  },
  "Object Oriented Programming": {
    "1. Intro, Classes & Objects": {content : oops_Intro},
    "2. Access Modifiers": {content : oops_Access_Modifier},
    "3. Encapsulation": {content : oops_Encapsulation},
    "4. Constructor & Destructor": {content : oops_Constructor},
    "5. Inheritance": {content : oops_Inheritance},
    "6. Overloading": {content : oops_Overloading},
    "7. Abstraction": {content : oops_Abstraction},
    "8. Static": {content : oops_Static},
  },
  "Misc": {
    "1. Token Transmission Types": {content : Misc_tokenTypes},
  },
  "TypeFace-Finance_Assistant": {
    "1. Commented code explain": {content : typeface_commented_code},
    "2. Detailed code explain": {content : typeface_detailed_code},
    "3. Question & Extension": {content : typeface_questionsNextensions},
    "4. Extension 1": {content : typeface_Extension0},
    "5. Extension 0": {content : typeface_Extensions1},
  },

};
