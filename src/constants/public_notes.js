// // src/constants/public_notes.js
// import HLD_Security_Contents from '../assets/PublicContent/HLD_Security_Contents.md?raw';


// export const notesData = {
//   High_Level_Design : [
//     {
//       topic: "Security",
//       content: HLD_Security_Contents
//     },
//     {
//       topic: "Consistency and ",
//       content: HLD_Security_Contents
//     }
//   ],
//   DummySubject: [
//     {
//       topic: "Topic Name1",
//       content: HLD_Security_Contents
//     },
//     {
//       topic: "topic Name2",
//       content: HLD_Security_Contents
//     }
//   ],

// };




// src/constants/public_notes.js
import HLD_Security_Contents from '../assets/PublicContent/HLD_Security_Contents.md?raw';

export const notesData = {
  "High Level Design": {
    "Security": {
      "Syllabus": { content: HLD_Security_Contents },
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
