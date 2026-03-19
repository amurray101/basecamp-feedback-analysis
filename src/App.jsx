// ─── BRAND TOKENS ───
const C = {
  bg: "#faf9f5", dark: "#141413", orange: "#d97757", blue: "#6a9bcc",
  green: "#788c5d", gray: "#b0aea5", lightGray: "#e8e6dc", cream: "#f5f3ee",
  text: "#141413", muted: "#6a685e", faint: "#b0aea5",
};

// ─── FEEDBACK RESPONSE DATA (Cohort 1 → Cohort 2 Analysis) ───
const FEEDBACK_RESPONSE = [
  {
    id: "diagnosis",
    number: "01",
    question: "Diagnosis: What are the 2\u20133 most important problems this feedback reveals? What\u2019s signal vs. noise?",
    answer: [
      { type: "heading", text: "Problem 1: Content density exceeds cognitive capacity." },
      { type: "paragraph", text: "This is the strongest signal in the dataset. The 31% \u201ctoo fast\u201d pacing response is itself notable, but it becomes decisive when triangulated with three other indicators: the flat confidence trend across all three days (4.29 \u2192 4.28 \u2192 4.28), the qualitative feedback explicitly naming \u201ctoo much content packed into the day,\u201d and the request for \u201cless content at a more reasonable pace.\u201d In learning science, flat confidence despite increasing exposure is a hallmark of cognitive overload \u2014 learners are processing new material before consolidating previous material (Sweller\u2019s Cognitive Load Theory, 1988). The 67% who said pacing was \u201cjust right\u201d likely had stronger prior technical backgrounds; the 31% signal represents the learners most at risk of disengaging." },
      { type: "heading", text: "Problem 2: Abstract-first instruction fails where build-first succeeds." },
      { type: "paragraph", text: "The Evals session scored 3.9 engagement \u2014 a full half-point below the 4.39 overall average \u2014 and received the most specific negative feedback in the dataset: \u201ctoo much time on abstract component taxonomy without enough concrete examples.\u201d Crucially, the same respondent noted \u201cthe build-along afterward was far more effective.\u201d This maps directly to Kolb\u2019s experiential learning cycle: abstract conceptualization without prior concrete experience produces shallow encoding. The interactive HTML presentation feedback reinforces this \u2014 the session that let people use the tool and build with concepts in real-time was cited as the best learning experience. This isn\u2019t one person\u2019s preference; it\u2019s a fundamental pedagogical principle surfacing in the data." },
      { type: "heading", text: "Problem 3: Learners don\u2019t feel progressive mastery, and the program doesn\u2019t differentiate by role." },
      { type: "paragraph", text: "The confidence scores are flat (4.29 \u2192 4.28 \u2192 4.28), and \u201capply independently\u201d shows an inconsistent pattern (4.2 \u2192 4.5 \u2192 4.3 \u2014 rising then falling). In a well-sequenced program, both metrics should show upward trajectories. The Day 3 \u201crealistic work simulation\u201d drop to 3.9 (from 4.3 and 4.4 on Days 1\u20132) suggests that the most technically complex day felt the least connected to real work. The feedback requesting \u201cmore splits between SA, Engineer, Research\u201d and \u201cguidance as to what is more relevant for each group\u201d indicates that a one-size-fits-all curriculum forces some learners through content that doesn\u2019t map to their job function, compounding the overload problem." },
      { type: "heading", text: "Signal vs. noise" },
      { type: "paragraph", text: "High-confidence signal: Pacing/overload (31% quantitative + multiple qualitative + flat confidence), Evals session failure (3.9 score + specific feedback), role differentiation gap (explicit request + structural curriculum implication), setup friction (specific and solvable). Moderate signal: Day 3 realism drop (3.9 score, single day), async/solo learner preference (one respondent, but represents a real learning modality gap worth monitoring). The async track request is a valid individual preference but doesn\u2019t represent a systemic problem given 67% pacing satisfaction. However, the principle behind it \u2014 that different learners need different modalities \u2014 is supported by self-determination theory (Deci & Ryan, 2000) and warrants a lightweight accommodation rather than a structural overhaul." },
    ],
    addressed: [
      {
        label: "Content density \u2192 5-day expansion with flipped classroom model",
        detail: "The original 3-day program has been expanded to 5 days, reducing per-day content density by ~40%. All conceptual content has been moved to self-paced pre-work foundations, reserving live sessions entirely for hands-on application.",
        refs: [
          { loc: "MODULES array (App.jsx, lines 794\u20131020)", what: "Five modules with explicit modality objects: Day 1 (45+45 min), Day 2 (60+60 min), Day 3 (45+75 min), Day 4 (90+30 min), Day 5 (120 min integrated). Each day has a defined live/lab split preventing content overrun." },
          { loc: "FOUNDATIONS pre-work (App.jsx, lines 380\u2013790)", what: "Seven foundation sections (F1\u2013F7b) offload conceptual content to self-paced learning. This is the flipped classroom model \u2014 Strelan et al. (2020) found a weighted effect size of 0.53 for flipped vs. traditional formats." },
          { loc: "Methodology page, \u201cFlipped classroom\u201d (App.jsx, lines 2256\u20132265)", what: "Explicitly cites Bishop & Verleger (2013): moving cognitively demanding work to live time when expert support is available." },
        ],
      },
      {
        label: "Abstract-first \u2192 Build-first session design across all modules",
        detail: "There is no standalone \u201cEvals\u201d session in the redesigned program. Every session opens with a client scenario and hands-on building. Evaluation concepts are embedded within the Applied Research path where learners construct working harnesses.",
        refs: [
          { loc: "FACILITATOR_GUIDES opening segments (App.jsx, lines 1037, 1062, 1087, 1112, 1137)", what: "Every day opens with a client scenario, not a concept lecture. Day 1: \u201cDon\u2019t start with \u2018today we\u2019ll learn to install.\u2019 Start with Meridian Health.\u201d Day 3: \u201cArcadia Financial has 60 engineers...\u201d" },
          { loc: "P4 Advanced Capabilities path (App.jsx, lines 1193\u20131205)", what: "Evaluation concepts appear only as hands-on outcomes: \u201cDesign a controlled experiment measuring CLAUDE.md impact\u201d with defined variables, sample size, and a running script." },
          { loc: "Experiential learning methodology (App.jsx, lines 2202\u20132210)", what: "Grounded in Freeman et al. (2014, PNAS): active learning reduces failure rates by 55%. Every module produces a real artifact." },
          { loc: "Interactive HTML presentation (public/slides/session-5-build.html)", what: "91KB interactive deck with live examples, animations, and diagrams \u2014 directly responding to the feedback that this format was \u201cSO helpful.\u201d Shared theme system in public/slides/shared/ enables additional per-session decks." },
        ],
      },
      {
        label: "Flat confidence + no role splits \u2192 4-path system with progressive, role-specific competencies",
        detail: "The program now offers four role-specific paths with distinct competency outcomes per module. Learners see growth through their own professional lens, and complexity builds from install to capstone.",
        refs: [
          { loc: "PATHS array (App.jsx, lines 1150\u20131156)", what: "Four distinct tracks: PE Pre-Sales, PE Post-Sales, Solutions Architect, Applied Research \u2014 directly addressing the \u201cmore splits between SA, Engineer, Research\u201d feedback." },
          { loc: "Per-module role competencies (App.jsx, lines 832\u2013837, 880\u2013885, 924\u2013931, 969\u2013976, 1014\u20131018)", what: "Each module defines distinct outcomes for pe-pre, pe-post, sa, and ar. A PE Pre-Sales on Day 1 sees \u201cDemo Claude Code\u2019s install to a prospect\u201d while an SA sees \u201cArticulate the value proposition to a technical audience.\u201d" },
          { loc: "PATH_OUTCOMES (App.jsx, lines 1160\u20131205)", what: "Five measurable competency outcomes per role, each with action + measure. This creates a visible progress ladder addressing the flat confidence trend." },
          { loc: "SKILL_CREDENTIALS (App.jsx, lines 1206\u20131240)", what: "Earnable badges per module (CLI Navigation, Agentic Tasking, etc.) make skill progression visible and collectible." },
          { loc: "Hub \u201cCurriculum design\u201d note (App.jsx, lines 2788\u20132801)", what: "Explicitly communicates: \u201cDays 1\u20133 are shared across all roles. Day 4 splits into role-specific scenarios. Day 5\u2019s capstone is tailored to your role.\u201d" },
        ],
      },
      {
        label: "Day 3 realism drop \u2192 Enterprise client scenario framing",
        detail: "Day 3 is framed around Arcadia Financial \u2014 a fintech with 60 engineers and compliance requirements \u2014 making integration exercises feel like realistic enterprise work.",
        refs: [
          { loc: "Module 3 client scenario (App.jsx, lines 920\u2013923)", what: "Arcadia Financial: \u201c60 engineers building a payment platform. Compliance requires nothing ships without lint, type checks, and tests.\u201d" },
          { loc: "Day 3 facilitator opening (App.jsx, line 1087)", what: "Opens with: \u201cCan Claude Code enforce quality gates and pull context automatically? Today you build that.\u201d" },
          { loc: "Module 3 modality (App.jsx, line 898)", what: "Day 3 is the most lab-heavy day: 45 min live + 75 min lab." },
        ],
      },
      {
        label: "Setup friction \u2192 Pre-work clone steps + facilitator backup plans",
        detail: "The program includes pre-work installation and repo clone steps, plus facilitator setup checklists with backup plans for common failure modes.",
        refs: [
          { loc: "Module 1 steps 1\u20134 (App.jsx, lines 814\u2013821)", what: "Self-paced pre-work: install CLI, verify, set up IDE, clone sample repo \u2014 all before Day 1 live session." },
          { loc: "Facilitator setup checklist (App.jsx, lines 1030\u20131034)", what: "\u201cEnsure the sample repo is accessible and npm install completes cleanly\u201d and \u201cHave a backup install plan for corporate proxy/VPN issues.\u201d" },
          { loc: "Live session note (App.jsx, line 811)", what: "\u201cComplete the self-paced pre-work before attending so you arrive with context.\u201d" },
          { loc: "Gap self-identification (App.jsx, lines 827\u2013830)", what: "Explicitly identifies remaining gap: \u201cTroubleshooting installation in customer environments\u201d with specific failure modes." },
        ],
      },
      {
        label: "Async/solo learner gap \u2192 Partial accommodation through self-paced foundations + Claude Chat",
        detail: "Self-paced foundations provide an async-friendly onramp, the Simplify toggle accommodates different speeds, and Claude Chat serves as on-demand office hours. A fully independent async track does not yet exist.",
        refs: [
          { loc: "Self-paced pre-work modality (App.jsx, lines 801, 850, 898)", what: "30\u201345 min of pre-work per module that learners complete independently before live sessions." },
          { loc: "Simplify toggle (App.jsx, line 2304)", what: "Plain-language mode accommodates different reading levels and speeds." },
          { loc: "Claude Chat integration (App.jsx, lines 47\u2013150)", what: "Optional AI chat provides on-demand Socratic guidance \u2014 functions as always-available office hours." },
          { loc: "Day 5 note (App.jsx, line 1001)", what: "\u201cDay 5 is entirely live\u201d \u2014 deliberate design choice (transfer-appropriate processing) but means async learners must attend the capstone." },
        ],
      },
    ],
  },
  {
    id: "changes",
    number: "02",
    question: "Changes: What specific changes would you make to the program for the next cohort? Be concrete \u2014 not \u201cimprove pacing\u201d but what you\u2019d actually do differently.",
    answer: [
      { type: "heading", text: "Change 1: Add 15-minute consolidation blocks between every live segment." },
      { type: "paragraph", text: "Instead of back-to-back segments (e.g., Day 1\u2019s 0\u20135, 5\u201315, 15\u201330, 30\u201340, 40\u201345), insert a 15-minute unstructured block after the midpoint of each live session. This is designated for questions, troubleshooting stragglers, and ad-hoc demos \u2014 not break time. Research on spacing effects (Cepeda et al., 2006) shows even brief gaps between learning events improve consolidation. Each 45-minute session becomes 60 minutes with no new content. The facilitator guide should name these \u201cconsolidation blocks\u201d so instructors don\u2019t fill them. Maps to: Problem 1 (content overload), 31% \u201ctoo fast\u201d pacing, flat confidence." },
      { type: "heading", text: "Change 2: Mandate a pre-Day 1 setup verification checkpoint." },
      { type: "paragraph", text: "Every participant must complete a verification script before Day 1: (a) Claude Code CLI installs and authenticates, (b) VS Code extension activates, (c) sample repo clones and npm installs, (d) a single Claude Code command runs successfully. Failures route to a 30-minute troubleshooting office hour the evening before Day 1. This converts a Day 1 risk into a pre-work guarantee. Maps to: setup friction eating into lab time." },
      { type: "heading", text: "Change 3: Build per-session interactive HTML presentations." },
      { type: "paragraph", text: "The most praised element was \u201cthe HTML presentation with live examples.\u201d Currently one deck serves all sessions. For Cohort 2, each day gets its own interactive deck with embedded examples participants can run, \u201ctry it yourself\u201d pause points, and animated concept visualizations. Clark & Mayer\u2019s multimedia learning principles (2016): interactivity during instruction produces 20\u201330% better transfer than passive observation. Maps to: Problem 2 (abstract vs. concrete), Evals engagement score." },
      { type: "heading", text: "Change 4: Replace Day 3\u2019s architecture discussion with a second build cycle." },
      { type: "paragraph", text: "Day 3 had the lowest \u201crealistic work simulation\u201d score (3.9). The current plan ends with a 10-minute architecture discussion (facilitator guide segment at 35\u201345 min). Replace this with a harder build challenge: \u201cArcadia\u2019s compliance team added a new requirement \u2014 no API calls without an audit trail. Extend your hooks to log every external request.\u201d This keeps learners building through the end when cognitive fatigue is highest. Maps to: Day 3 realism drop to 3.9." },
      { type: "heading", text: "Change 5: Add before/after confidence calibration at the start and end of each day." },
      { type: "paragraph", text: "At each day\u2019s start, a 2-minute self-assessment: \u201cRate your confidence on [today\u2019s skill] from 1\u20135.\u201d Repeat at end. This creates within-session growth signals that flat cross-day averages miss. Research on self-regulated learning (Zimmerman, 2002): calibration exercises accelerate metacognitive development. Display the delta, not just the absolute score. Maps to: Problem 3 (flat confidence, no ramp)." },
      { type: "heading", text: "Change 6: Surface role-specific callouts during shared Days 1\u20133 sessions." },
      { type: "paragraph", text: "While Days 1\u20133 remain shared, add explicit \u201cfor your role\u201d moments at each transition: \u201cIf you\u2019re in Pre-Sales, notice how you\u2019d narrate this to a prospect. If you\u2019re an SA, think about how this maps to an org-wide rollout.\u201d The per-module competencies already contain this framing \u2014 the change is making it a live facilitation practice. Maps to: lack of role-specific differentiation." },
      { type: "heading", text: "Change 7: Offer a lightweight async accommodation for solo learners." },
      { type: "paragraph", text: "Don\u2019t build a full parallel async track (overkill for n=1), but add: (a) record all live sessions with recordings available within 2 hours, and (b) offer a 30-minute daily office hours slot (optional, drop-in) for learners who prefer independent work. This respects self-determination theory\u2019s autonomy principle without fragmenting the cohort. Maps to: async/solo learner gap." },
    ],
    addressed: [
      {
        label: "Buffer blocks \u2192 Facilitator guide timing structure",
        detail: "Facilitator guides include per-segment timing and lab notes acknowledging pacing risks. Explicit buffer blocks are not yet formalized as named segments.",
        refs: [
          { loc: "FACILITATOR_GUIDES Day 1 segments (App.jsx, lines 1036\u20131048)", what: "Segments timed to the minute. Adding a 15-min consolidation block after the 30-min mark would extend to 60 min without adding content." },
          { loc: "Day 3 lab notes (App.jsx, line 1093)", what: "\u201c75 min \u2014 the longest lab. Some will struggle with MCP setup \u2014 have fallbacks ready.\u201d The awareness exists; formalizing buffer time is next." },
        ],
      },
      {
        label: "Setup verification \u2192 Pre-work steps + facilitator checklists",
        detail: "Pre-work clone/install steps and facilitator backup plans address this. A formal automated verification script would extend it into a guaranteed checkpoint.",
        refs: [
          { loc: "Module 1 step 4 (App.jsx, line 818)", what: "Pre-work: git clone + npm install with explicit expected outcomes." },
          { loc: "Facilitator checklist (App.jsx, lines 1030\u20131034)", what: "\u201cEnsure the sample repo is accessible\u201d and \u201cHave a backup install plan for proxy/VPN issues.\u201d" },
          { loc: "Gap identification (App.jsx, lines 827\u2013830)", what: "Self-identified gap: \u201cTroubleshooting installation in customer environments\u201d with specific failure modes." },
        ],
      },
      {
        label: "Per-session interactive decks \u2192 HTML slide infrastructure",
        detail: "One interactive HTML presentation exists with a reusable shared design system. Architecture supports per-session decks; only one is built so far.",
        refs: [
          { loc: "public/slides/session-5-build.html (91KB)", what: "Full interactive presentation with live examples, animations, and diagrams." },
          { loc: "public/slides/shared/ directory", what: "Reusable theme system (theme.css, animations.css, diagrams.css, icons.css) for building additional decks." },
          { loc: "slidesDeck references (App.jsx, lines 1028, 1053, 1078)", what: "Days 1\u20133 reference the same deck; Days 4\u20135 have null. Architecture supports but doesn\u2019t yet deliver per-session interactivity." },
        ],
      },
      {
        label: "Day 3 second build cycle \u2192 Extended lab with client framing",
        detail: "Day 3 is already the most lab-heavy day. The architecture discussion segment at 35\u201345 min is the specific change target.",
        refs: [
          { loc: "Module 3 modality (App.jsx, line 898)", what: "45 min live + 75 min lab \u2014 the longest hands-on block." },
          { loc: "Day 3 segment 5 (App.jsx, line 1091)", what: "35\u201345 min: \u201cSketch the integration architecture for Arcadia.\u201d This segment would be replaced with a build challenge." },
        ],
      },
      {
        label: "Confidence calibration \u2192 Knowledge checkpoints + credential system",
        detail: "Per-module checkpoints and visual badges provide qualitative growth signals. Numeric before/after ratings would extend these into quantitative confidence measurement.",
        refs: [
          { loc: "KNOWLEDGE_CHECKPOINTS (App.jsx, lines 1252\u20131274)", what: "Two reflection questions per day with hints \u2014 qualitative retrieval practice. Could be extended with 1\u20135 confidence scale." },
          { loc: "SKILL_CREDENTIALS (App.jsx, lines 1206\u20131240)", what: "Earnable badges that unlock progressively \u2014 visible growth, not yet numeric self-rating." },
        ],
      },
      {
        label: "Role callouts during shared sessions \u2192 Per-module competencies object",
        detail: "Each module already contains role-specific competency descriptions that could be surfaced as live facilitation prompts.",
        refs: [
          { loc: "Module competencies (App.jsx, lines 832\u2013837, 880\u2013885, 924\u2013931)", what: "Distinct outcomes for pe-pre, pe-post, sa, ar per module. These exist in the app but aren\u2019t formatted as facilitator talking points." },
          { loc: "Module view role block (App.jsx, lines 2539\u20132545)", what: "UI shows \u201cYour outcome \u00b7 [role]\u201d \u2014 learners see personalized framing in the app." },
        ],
      },
      {
        label: "Async accommodation \u2192 Self-paced foundations + Claude Chat",
        detail: "Self-paced pre-work and optional Claude Chat provide partial async support. Recorded sessions and structured office hours would complete the accommodation.",
        refs: [
          { loc: "Self-paced pre-work (App.jsx, lines 801, 850, 898)", what: "30\u201345 min pre-work per module that learners complete independently." },
          { loc: "Claude Chat (App.jsx, lines 47\u2013150)", what: "On-demand AI guidance functions as always-available office hours." },
        ],
      },
    ],
  },
  {
    id: "measurement",
    number: "03",
    question: "Measurement: How would you know if your changes worked? What would you measure, and what does \u201csuccess\u201d look like for Cohort 2?",
    answer: [
      { type: "paragraph", text: "Effective measurement requires tracking both leading indicators (process metrics confirming changes land during the program) and lagging indicators (outcome metrics confirming durable impact after). Each metric maps to a specific change and diagnosed problem." },
      { type: "heading", text: "Metric 1: Pacing satisfaction \u2014 target <15% \u201cToo fast\u201d (from 31%)." },
      { type: "paragraph", text: "Directly tests buffer blocks (Change 1) and content reduction. Collect the three-option pacing survey per day rather than once at program end. Success: \u201cJust right\u201d exceeds 75% on every day, \u201cToo fast\u201d drops below 15% overall. If Day 3 remains high, buffer blocks need to be longer on that day." },
      { type: "heading", text: "Metric 2: Confidence trajectory \u2014 target upward slope, minimum +0.5 from Day 1 to Day 5." },
      { type: "paragraph", text: "The flat 4.29 \u2192 4.28 \u2192 4.28 was the clearest \u201cno ramp\u201d signal. Measure daily on same 1\u20135 scale. Target is trajectory, not number: Day 1 should be lowest, each day higher. +0.5 minimum Day 1 to Day 5 indicates felt progressive mastery. The before/after calibration (Change 5) provides within-day resolution. If confidence plateaus after Day 3, customer scenario and capstone days need stronger skill-confidence building." },
      { type: "heading", text: "Metric 3: Session engagement floor \u2014 target 4.2 minimum (from 3.9 floor)." },
      { type: "paragraph", text: "The Evals 3.9 was the clearest single-session failure. With abstract taxonomy removed and build-first design everywhere, no session should fall below 4.2. Measure per session, not per day. Any session below 4.0 needs the same treatment: strip abstract framing, lead with building." },
      { type: "heading", text: "Metric 4: \u201cApply independently\u201d \u2014 target consistent upward slope, ending 4.5+." },
      { type: "paragraph", text: "Cohort 1: 4.2 \u2192 4.5 \u2192 4.3 (rise then fall). Should climb steadily across five days. Day 5 capstone \u2014 blind brief, no facilitator help \u2014 is the ultimate test. If Day 5 scores below 4.3, scaffolding-to-independence transition needs more fading in middle days." },
      { type: "heading", text: "Metric 5: NPS \u2014 target 50+ (from 35)." },
      { type: "paragraph", text: "Lagging indicator integrating everything. 35 with 18% detractors = meaningful dissatisfaction. Target: 50+ (detractors <10%, promoters 60%+). Below 45 = core problems not solved. Above 55 = changes overdelivered." },
      { type: "heading", text: "Metric 6: Setup friction \u2014 target 0 minutes of Day 1 live time on install issues." },
      { type: "paragraph", text: "Tests the verification checkpoint (Change 2). Track: (a) participants needing install help during live session (target: 0), (b) checkpoint completion rate before Day 1 (target: 100%). If anyone arrives without a working setup, the checkpoint process failed." },
      { type: "heading", text: "Metric 7: Role-specific relevance \u2014 target 4.3+ (new metric)." },
      { type: "paragraph", text: "New per-day survey item: \u201cToday\u2019s content was relevant to my specific role\u201d (1\u20135). Tests role callouts (Change 6) and path system. Segment by role \u2014 if SAs consistently rate lower than PEs, shared Days 1\u20133 need more SA application moments." },
      { type: "heading", text: "Metric 8: Day 3 \u201crealistic work simulation\u201d \u2014 target 4.3+ (from 3.9)." },
      { type: "paragraph", text: "Tests the second build cycle replacement (Change 4). Collect daily to confirm the fix and detect if the problem migrates to another day." },
      { type: "heading", text: "What \u201csuccess\u201d looks like in one sentence:" },
      { type: "paragraph", text: "Cohort 2 succeeds if every participant arrives Day 1 with a working install, feels increasingly confident each day, never encounters a session scoring below 4.2, rates content as relevant to their role (4.3+), and leaves Day 5 recommending the program to a colleague (NPS 50+)." },
    ],
    addressed: [
      {
        label: "Per-session measurement infrastructure \u2192 Progress tracking + checkpoints",
        detail: "localStorage-based progress system with per-module checkpoints provides the data pipeline for measurement.",
        refs: [
          { loc: "KNOWLEDGE_CHECKPOINTS (App.jsx, lines 1252\u20131274)", what: "Per-day reflection checkpoints with completion tracking \u2014 could extend with numeric self-rating." },
          { loc: "Progress persistence (App.jsx, lines 15\u201345)", what: "Tracks foundations viewed, module sub-progress, checkpoints completed." },
          { loc: "moduleSubProgress state (App.jsx, line 2008)", what: "Tracks started \u2192 checkpoint-done \u2192 complete per module." },
        ],
      },
      {
        label: "Role-specific relevance measurement \u2192 Path system + competencies",
        detail: "The four-path system with role-specific competencies provides the structure to be measured. Adding a survey item would capture whether it\u2019s landing.",
        refs: [
          { loc: "PATHS array (App.jsx, lines 1150\u20131156)", what: "Four distinct tracks with role labels and descriptions." },
          { loc: "Per-module competencies (App.jsx, lines 832\u2013837 etc.)", what: "Role-specific outcomes per module \u2014 the content to be measured for relevance." },
          { loc: "PathSelectPage (App.jsx, lines 1903\u20131987)", what: "Active role selection with visible outcomes creates measurable role alignment." },
        ],
      },
      {
        label: "Progressive mastery visibility \u2192 Credential system + certificate",
        detail: "Visual credentials, progress bars, and completion certificate make growth tangible.",
        refs: [
          { loc: "ProgressIndicator (App.jsx, line 2105)", what: "Visual progress bar at every stage." },
          { loc: "Earned skills computation (App.jsx, lines 2062\u20132080)", what: "Dynamic credential calculation updating as learners progress." },
          { loc: "Hub credentials (App.jsx, lines 2722\u20132754)", what: "Shows earnable badges with earned/unearned state \u2014 concrete progress visibility." },
          { loc: "CompletionCertificate (App.jsx, lines 1845\u20131901)", what: "Capstone artifact representing the full Day 1 to Day 5 journey." },
        ],
      },
    ],
  },
];

// ─── STYLES ───
const st = {
  page: { minHeight: "100vh", background: C.bg, color: C.dark, fontFamily: "var(--sans)" },
  container: { maxWidth: 640, margin: "0 auto", padding: "56px 28px 80px" },
  fadeUp: { opacity: 0, animation: "fadeUp 0.7s ease forwards" },
  eyebrow: { fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 2.5, color: C.faint, textTransform: "uppercase" },
  heroTitle: { fontFamily: "var(--serif)", fontSize: 42, fontWeight: 400, lineHeight: 1.12, margin: "0 0 20px", color: C.dark, letterSpacing: -0.5 },
  heroBody: { fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.7, color: C.muted, maxWidth: 500, margin: 0 },
  bodyText: { fontFamily: "var(--sans)", fontSize: 14.5, lineHeight: 1.72, color: C.muted, margin: "0 0 16px" },
  sectionHeading: { fontFamily: "var(--serif)", fontSize: 20, fontWeight: 400, color: C.dark, margin: "28px 0 12px" },
  navBtn: { background: "none", border: "none", color: C.faint, cursor: "pointer", fontSize: 13, fontFamily: "var(--sans)", padding: 0 },
};

// ─── FEEDBACK RESPONSE PAGE COMPONENT ───
export default function App() {
  return (
    <div style={st.page}>
      <div style={st.container}>
        <div style={{ ...st.fadeUp, marginTop: 16 }}>
          <div style={st.eyebrow}>Cohort 1 feedback analysis</div>
          <div style={{ height: 2, width: 48, background: C.green, margin: "16px 0 32px", borderRadius: 1 }} />
          <h1 style={{ ...st.heroTitle, fontSize: 36 }}>Feedback<br /><span style={{ color: C.green }}>response.</span></h1>
          <p style={st.heroBody}>
            A written analysis of Cohort 1 program feedback (NPS: 35, n=17). Each section presents the question asked, the answer grounded in learning science and the data provided, and how the current program design addresses the finding.
          </p>
        </div>

        {/* Cohort 1 summary stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, margin: "36px 0 40px", ...st.fadeUp, animationDelay: "0.1s" }}>
          {[
            { stat: "35", label: "NPS", sub: "n=17" },
            { stat: "4.1", label: "Met expectations", sub: "1\u20135 avg" },
            { stat: "31%", label: "Said \u201cToo fast\u201d", sub: "pacing" },
            { stat: "3.9", label: "Evals engagement", sub: "lowest session" },
            { stat: "flat", label: "Confidence trend", sub: "4.29\u21924.28\u21924.28" },
            { stat: "3.9", label: "Day 3 realism", sub: "work simulation" },
          ].map((s, i) => (
            <div key={i} style={{ background: C.cream, border: `1px solid ${C.lightGray}`, borderRadius: 10, padding: "16px 14px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 22, color: s.stat === "flat" || parseFloat(s.stat) < 4.0 || s.stat === "31%" ? C.orange : C.green, lineHeight: 1.2 }}>{s.stat}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 11, color: C.muted, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: C.faint, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Q&A Sections */}
        {FEEDBACK_RESPONSE.map((section, si) => (
          <div key={section.id} style={{ marginBottom: 56, ...st.fadeUp, animationDelay: `${0.15 + si * 0.08}s` }}>

            {/* Question */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: 42, color: C.green, lineHeight: 1, opacity: 0.25, flexShrink: 0 }}>{section.number}</span>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400, color: C.dark, margin: 0, lineHeight: 1.35 }}>{section.question}</h2>
            </div>

            {/* Answer */}
            <div style={{ marginBottom: 28, padding: "24px 24px", background: C.cream, borderRadius: 12, border: `1px solid ${C.lightGray}` }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.green, marginBottom: 16 }}>Analysis based on course best practices & data</div>
              {section.answer.map((block, bi) => {
                if (block.type === "heading") {
                  return <h3 key={bi} style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: C.dark, margin: bi === 0 ? "0 0 8px" : "20px 0 8px", lineHeight: 1.4 }}>{block.text}</h3>;
                }
                return <p key={bi} style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: C.muted, lineHeight: 1.7, margin: "0 0 12px" }}>{block.text}</p>;
              })}
            </div>

            {/* How addressed */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.orange, marginBottom: 14 }}>How this has been addressed in the current program</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {section.addressed.map((item, ai) => (
                  <div key={ai} style={{ background: C.bg, borderRadius: 10, border: `1px solid ${C.lightGray}`, borderLeft: `3px solid ${C.orange}`, overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px" }}>
                      <div style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 500, color: C.dark, marginBottom: 6 }}>{item.label}</div>
                      <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: C.muted, lineHeight: 1.6, margin: "0 0 12px" }}>{item.detail}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {item.refs.map((ref, ri) => (
                          <div key={ri} style={{ display: "flex", gap: 10, padding: "8px 12px", background: C.cream, borderRadius: 6 }}>
                            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: C.orange, flexShrink: 0, minWidth: 8, marginTop: 2 }}>{"\u2192"}</span>
                            <div>
                              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: C.dark, marginBottom: 2 }}>{ref.loc}</div>
                              <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: C.faint, lineHeight: 1.5 }}>{ref.what}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${C.lightGray}`, paddingTop: 24, marginTop: 20, ...st.fadeUp, animationDelay: "0.5s" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.faint, marginBottom: 10 }}>Summary of feedback coverage</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[
              "Pacing / content overload",
              "Flat confidence (no ramp)",
              "Evals low engagement",
              "Day 3 realism drop",
              "Role-specific differentiation",
              "Setup friction",
              "Async/solo learner gap",
              "Build-first vs. abstract-first",
              "Interactive presentations",
              "Hands-on > lecture",
            ].map((tag, i) => (
              <span key={i} style={{ fontFamily: "var(--mono)", fontSize: 9, padding: "4px 10px", borderRadius: 14, border: `1px solid ${C.green}30`, color: C.green, background: C.green + "08" }}>{tag}</span>
            ))}
          </div>
          <p style={{ fontFamily: "var(--sans)", fontSize: 12, color: C.faint, marginTop: 16, lineHeight: 1.5 }}>
            Each tag above is addressed in at least one diagnosis, change, and measurement section. References point to specific lines, modules, and design decisions in the Claude Code Basecamp codebase.
          </p>
        </div>
      </div>
    </div>
  );
}
