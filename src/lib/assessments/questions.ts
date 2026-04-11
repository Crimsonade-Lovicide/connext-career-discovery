// Original assessment items based on the public-domain Big Five (OCEAN)
// and Holland Codes (RIASEC) frameworks. Responses use a 1-5 Likert scale.
//
// Big Five traits:
//   O - Openness
//   C - Conscientiousness
//   E - Extraversion
//   A - Agreeableness
//   N - Neuroticism  (we report it as "Emotional Steadiness" = 6 - raw N avg)
//
// RIASEC (Holland Codes):
//   R - Realistic      (builders, hands-on, mechanical)
//   I - Investigative  (thinkers, analytical, scientific)
//   A - Artistic       (creators, expressive, unstructured)
//   S - Social         (helpers, teachers, supporters)
//   E - Enterprising   (persuaders, leaders, sellers)
//   C - Conventional   (organizers, detail, systems)

export type Trait = "O" | "C" | "E" | "A" | "N";
export type RIASEC = "R" | "I" | "A" | "S" | "E" | "C";

export type Question =
  | {
      id: string;
      kind: "bigfive";
      trait: Trait;
      reversed: boolean;
      prompt: string;
    }
  | {
      id: string;
      kind: "riasec";
      code: RIASEC;
      prompt: string;
    };

// 20 Big Five items (4 per trait) + 18 RIASEC items (3 per code) = 38 questions.
// Keeps the chat flow ~8 minutes.

export const QUESTIONS: Question[] = [
  // --- Openness ---
  { id: "o1", kind: "bigfive", trait: "O", reversed: false, prompt: "I enjoy exploring ideas that don't have clear answers." },
  { id: "o2", kind: "bigfive", trait: "O", reversed: false, prompt: "I'm drawn to art, design, or creative expression." },
  { id: "o3", kind: "bigfive", trait: "O", reversed: true,  prompt: "I prefer sticking with what I already know over trying new things." },
  { id: "o4", kind: "bigfive", trait: "O", reversed: false, prompt: "I often find myself wondering how things could be different." },

  // --- Conscientiousness ---
  { id: "c1", kind: "bigfive", trait: "C", reversed: false, prompt: "I finish what I start, even when it gets tedious." },
  { id: "c2", kind: "bigfive", trait: "C", reversed: false, prompt: "I plan ahead and keep track of details." },
  { id: "c3", kind: "bigfive", trait: "C", reversed: true,  prompt: "I tend to leave things until the last minute." },
  { id: "c4", kind: "bigfive", trait: "C", reversed: false, prompt: "I take deadlines and commitments seriously." },

  // --- Extraversion ---
  { id: "e1", kind: "bigfive", trait: "E", reversed: false, prompt: "I feel energized after spending time with groups of people." },
  { id: "e2", kind: "bigfive", trait: "E", reversed: true,  prompt: "I need a lot of quiet time alone to recharge." },
  { id: "e3", kind: "bigfive", trait: "E", reversed: false, prompt: "I'm comfortable speaking up in meetings or group settings." },
  { id: "e4", kind: "bigfive", trait: "E", reversed: false, prompt: "I like meeting new people and starting conversations." },

  // --- Agreeableness ---
  { id: "a1", kind: "bigfive", trait: "A", reversed: false, prompt: "I try hard to see things from other people's perspectives." },
  { id: "a2", kind: "bigfive", trait: "A", reversed: false, prompt: "I'd rather find common ground than win an argument." },
  { id: "a3", kind: "bigfive", trait: "A", reversed: true,  prompt: "I'm willing to be blunt even if it hurts someone's feelings." },
  { id: "a4", kind: "bigfive", trait: "A", reversed: false, prompt: "Helping others feels meaningful to me, even when it's inconvenient." },

  // --- Neuroticism (emotional reactivity) ---
  { id: "n1", kind: "bigfive", trait: "N", reversed: false, prompt: "I worry about things that might go wrong." },
  { id: "n2", kind: "bigfive", trait: "N", reversed: false, prompt: "I get stressed easily under pressure." },
  { id: "n3", kind: "bigfive", trait: "N", reversed: true,  prompt: "I stay calm when things don't go as planned." },
  { id: "n4", kind: "bigfive", trait: "N", reversed: false, prompt: "My mood can shift a lot during the day." },

  // --- Realistic ---
  { id: "r1", kind: "riasec", code: "R", prompt: "I like working with tools, machines, or physical materials." },
  { id: "r2", kind: "riasec", code: "R", prompt: "I'd rather build or fix something tangible than sit in a meeting." },
  { id: "r3", kind: "riasec", code: "R", prompt: "I enjoy being outdoors or doing hands-on work." },

  // --- Investigative ---
  { id: "i1", kind: "riasec", code: "I", prompt: "I love digging into a problem until I really understand it." },
  { id: "i2", kind: "riasec", code: "I", prompt: "I'm drawn to research, data, or scientific questions." },
  { id: "i3", kind: "riasec", code: "I", prompt: "I enjoy learning something new just because it's interesting." },

  // --- Artistic ---
  { id: "ar1", kind: "riasec", code: "A", prompt: "I express myself best through writing, art, music, or design." },
  { id: "ar2", kind: "riasec", code: "A", prompt: "I get restless in rigid, highly structured environments." },
  { id: "ar3", kind: "riasec", code: "A", prompt: "I'd rather create something original than follow a template." },

  // --- Social ---
  { id: "s1", kind: "riasec", code: "S", prompt: "I find it rewarding to teach, coach, or mentor other people." },
  { id: "s2", kind: "riasec", code: "S", prompt: "I notice when someone is struggling and want to help." },
  { id: "s3", kind: "riasec", code: "S", prompt: "I'd choose a career focused on people over one focused on things." },

  // --- Enterprising ---
  { id: "en1", kind: "riasec", code: "E", prompt: "I enjoy persuading others to see things my way." },
  { id: "en2", kind: "riasec", code: "E", prompt: "I'd like to lead a team or start my own venture someday." },
  { id: "en3", kind: "riasec", code: "E", prompt: "Competition and ambitious goals motivate me." },

  // --- Conventional ---
  { id: "cv1", kind: "riasec", code: "C", prompt: "I like organizing information into clean systems." },
  { id: "cv2", kind: "riasec", code: "C", prompt: "I'm comfortable working with numbers, spreadsheets, or records." },
  { id: "cv3", kind: "riasec", code: "C", prompt: "I feel satisfied when a process runs smoothly and accurately." },
];
