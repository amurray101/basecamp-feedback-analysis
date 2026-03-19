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
    question: "What are the 2-3 most important problems this feedback reveals?",
    items: [
      {
        problem: "Content density exceeds cognitive capacity",
        analysis: "31% of respondents said pacing was 'too fast.' That number alone is notable, but it gets worse when stacked against three other data points: confidence scores stayed flat across all three days (4.29, 4.28, 4.28), respondents wrote 'too much content packed into the day,' and one asked for 'less content at a more reasonable pace.' Flat confidence despite increasing exposure is a textbook sign of overload — new material arrives before the previous material sets. The 67% who said pacing was 'just right' had stronger technical backgrounds going in. The 31% represents the learners most likely to disengage.",
        implementation: {
          label: "Expanded from 3 days to 5 with a flipped classroom model",
          detail: "The program now runs 5 days instead of 3, cutting per-day content by ~40%. All conceptual material moved to self-paced pre-work. Live sessions are reserved for hands-on building.",
        },
      },
      {
        problem: "Abstract-first instruction fails; build-first succeeds",
        analysis: "The Evals session scored 3.9 engagement — a full half-point below the 4.39 average — and drew the most pointed negative feedback: 'too much time on abstract component taxonomy without enough concrete examples.' The same respondent noted 'the build-along afterward was far more effective.' The interactive HTML presentation reinforced the pattern — the session where people touched the tool and built in real time was the most praised. People learn by doing, not by listening to category definitions.",
        implementation: {
          label: "No more standalone lectures — every session opens with building",
          detail: "The Evals session is gone. Every day opens with a client scenario and hands-on work. Day 1: 'Meridian Health's team takes 2-3 days per endpoint. Show them how to do it in minutes.' Day 3: 'Arcadia Financial needs compliance gates. Build it.' Evaluation concepts now appear in the Applied Research track as working harnesses, not taxonomy slides.",
        },
      },
      {
        problem: "No progressive mastery, no role differentiation",
        analysis: "Confidence scores stayed flat (4.29, 4.28, 4.28). 'Apply independently' rose then fell (4.2, 4.5, 4.3). Both should climb. Day 3's 'realistic work simulation' score dropped to 3.9 (from 4.3 and 4.4 on Days 1-2) — the hardest technical day felt the least connected to real work. Respondents asked for 'more splits between SA, Engineer, Research' and 'guidance as to what is more relevant for each group.' A one-size-fits-all curriculum forces people through content that doesn't map to their job.",
        implementation: {
          label: "Four role-specific paths with per-module competency outcomes",
          detail: "Four tracks: PE Pre-Sales, PE Post-Sales, Solutions Architect, Applied Research. Each module shows a role-specific outcome. A PE on Day 1 sees 'Demo Claude Code's install to a prospect.' An SA sees 'Articulate the value proposition to a technical audience.' Day 4 splits into role-specific breakouts. Skill badges make progress visible.",
        },
      },
      {
        problem: "Setup friction eats into Day 1 lab time",
        analysis: "Multiple respondents reported install and environment issues during live sessions. Every minute spent debugging npm on Day 1 is a minute not spent on the first agentic task. This is specific and solvable.",
        implementation: {
          label: "Pre-work install steps + facilitator backup plans",
          detail: "Participants complete installation, IDE setup, and repo cloning as pre-work before Day 1. Facilitator checklists include backup plans for proxy issues, PATH misconfigurations, and WSL sandbox setup. Target: zero minutes of Day 1 live time on install problems.",
        },
      },
    ],
    signalVsNoise: "High-confidence signal: pacing/overload (31% quantitative + qualitative + flat confidence), Evals session failure (3.9 + specific feedback), role differentiation gap (explicit requests), setup friction (specific, solvable). Moderate signal: Day 3 realism drop (3.9, single day), async/solo preference (one respondent, but a real modality gap). The async request is a valid preference but not a systemic problem given 67% pacing satisfaction. Worth a lightweight accommodation, not a structural overhaul.",
  },
  {
    id: "changes",
    number: "02",
    question: "What specific changes would you make for the next cohort?",
    items: [
      {
        problem: "Back-to-back segments with no breathing room",
        analysis: "Day 1's live session runs 0-5, 5-15, 15-30, 30-40, 40-45 with no gaps. Insert a 15-minute unstructured block after the midpoint — for questions, troubleshooting, and ad-hoc demos. Not break time. Each 45-minute session becomes 60 minutes with no new content. Name these 'consolidation blocks' in the facilitator guide so instructors don't fill them.",
        implementation: {
          label: "Facilitator guides include per-segment timing with pacing notes",
          detail: "Guides time each segment to the minute and flag pacing risks. Formal consolidation blocks are not yet named as distinct segments — adding a 15-minute buffer after the 30-minute mark is the next step.",
        },
      },
      {
        problem: "No pre-Day 1 setup verification",
        analysis: "Mandate a verification checkpoint before Day 1: (a) CLI installs and authenticates, (b) VS Code extension activates, (c) sample repo clones and npm installs, (d) a single Claude Code command runs. Route failures to a 30-minute troubleshooting session the evening before.",
        implementation: {
          label: "Pre-work steps exist; automated verification script is next",
          detail: "Module 1 includes pre-work for install, verify, IDE setup, and repo clone. Facilitator checklists cover proxy/VPN fallbacks. An automated script that gates attendance would close the remaining gap.",
        },
      },
      {
        problem: "One slide deck serves all sessions",
        analysis: "The most praised element was 'the HTML presentation with live examples.' Each day should get its own interactive deck with embedded examples, 'try it yourself' pauses, and animated visuals.",
        implementation: {
          label: "Basecamp-specific deck built; per-session decks are next",
          detail: "A 44-slide Basecamp deck covers all 5 days with facilitator speaker notes on every slide. The shared design system supports per-session decks. Days 4-5 have no slides by design (role-play and capstone).",
        },
      },
      {
        problem: "Day 3 ends with discussion instead of building",
        analysis: "Day 3 scored lowest on 'realistic work simulation' (3.9). The plan ends with a 10-minute architecture discussion. Replace it with a harder build challenge: 'Arcadia's compliance team added a new requirement — no API calls without an audit trail. Extend your hooks to log every external request.'",
        implementation: {
          label: "Day 3 reframed around Arcadia Financial with extended lab",
          detail: "Day 3 is now the most lab-heavy day (45 min live + 75 min lab), framed around Arcadia Financial — a fintech with 60 engineers and compliance requirements.",
        },
      },
      {
        problem: "No within-day confidence measurement",
        analysis: "Add a 2-minute self-assessment at the start and end of each day: 'Rate your confidence on [today's skill] from 1-5.' Display the delta, not the absolute score.",
        implementation: {
          label: "Checkpoints and skill badges provide qualitative growth signals",
          detail: "Per-module checkpoints with reflection questions and earnable skill badges make progress visible. Adding a numeric 1-5 scale at each checkpoint would produce trajectory data.",
        },
      },
      {
        problem: "Shared Days 1-3 feel generic across roles",
        analysis: "Add 'for your role' moments at each transition: 'Pre-Sales, notice how you'd narrate this to a prospect. SA, think about how this maps to an org-wide rollout.' The per-module competencies contain this framing — the change is making it a live facilitation practice.",
        implementation: {
          label: "Per-module competencies exist; live facilitation prompts are next",
          detail: "Each module defines distinct outcomes for four roles. The app shows personalized 'Your outcome' statements. Formatting these as facilitator talking points for live sessions would close the gap.",
        },
      },
      {
        problem: "No accommodation for async or solo learners",
        analysis: "Don't build a full parallel async track (overkill for one respondent). Add: (a) record all live sessions, available within 2 hours, and (b) offer a 30-minute daily drop-in office hours slot.",
        implementation: {
          label: "Self-paced foundations and Claude Chat provide partial async support",
          detail: "30-45 min of self-paced pre-work per module. Simplify toggle for different reading speeds. Claude Chat as on-demand office hours. Recorded sessions and structured office hours would complete it.",
        },
      },
    ],
  },
  {
    id: "measurement",
    number: "03",
    question: "How would you know if these changes worked?",
    items: [
      {
        problem: "Pacing satisfaction — target: <15% 'Too fast' (from 31%)",
        analysis: "Collect the pacing survey per day, not once at program end. 'Just right' should exceed 75% every day; 'Too fast' should drop below 15%. If Day 3 stays high, buffer blocks on that day need to be longer.",
        implementation: {
          label: "5-day expansion cuts per-day density by ~40%",
          detail: "The 3-day program is now 5 days. Pre-work foundations absorb all lecture content. Facilitator guides flag pacing risks per segment.",
        },
      },
      {
        problem: "Confidence trajectory — target: +0.5 from Day 1 to Day 5",
        analysis: "The flat 4.29, 4.28, 4.28 was the clearest 'no ramp' signal. Measure daily on the same 1-5 scale. Target is trajectory, not absolute number: Day 1 should be lowest, each day higher. If confidence plateaus after Day 3, the customer scenario and capstone days need stronger skill-building.",
        implementation: {
          label: "Per-module checkpoints and credential badges track progression",
          detail: "Reflection checkpoints and earnable skill badges create visible growth. Adding a numeric before/after confidence rating at each checkpoint would produce the trajectory data.",
        },
      },
      {
        problem: "Session engagement floor — target: 4.2 minimum (from 3.9)",
        analysis: "The Evals 3.9 was the clearest single-session failure. With build-first design across all sessions, nothing should fall below 4.2. Measure per session. Any session below 4.0 gets the same fix: strip abstract framing, lead with building.",
        implementation: {
          label: "No abstract-first sessions remain",
          detail: "Every session opens with a client scenario and hands-on work. Interactive HTML presentations with live examples replace passive slide decks.",
        },
      },
      {
        problem: "'Apply independently' — target: upward slope ending at 4.5+",
        analysis: "Cohort 1: 4.2, 4.5, 4.3 (rose then fell). Should climb across five days. Day 5's capstone — blind brief, no facilitator help — is the test. If Day 5 scores below 4.3, the middle days need more scaffolding-to-independence fading.",
        implementation: {
          label: "Day 5 capstone is the transfer test",
          detail: "Blind customer brief, time pressure, peer evaluation. If a trainee can go from cold brief to working demo and presentation, independence is demonstrated.",
        },
      },
      {
        problem: "NPS — target: 50+ (from 35)",
        analysis: "35 with 18% detractors = real dissatisfaction. Target: 50+ with detractors below 10% and promoters above 60%. Below 45 = core problems not solved. Above 55 = changes over-delivered.",
        implementation: {
          label: "NPS is the integration test for all changes",
          detail: "NPS measures the aggregate effect. If structural problems are fixed, NPS follows.",
        },
      },
      {
        problem: "Setup friction — target: 0 minutes of Day 1 live time on installs",
        analysis: "Track: (a) participants needing install help during the live session (target: 0), and (b) pre-work checkpoint completion rate (target: 100%). If anyone arrives without a working setup, the checkpoint failed.",
        implementation: {
          label: "Pre-work installation steps + facilitator backup plans",
          detail: "Installation, IDE setup, and repo cloning happen as pre-work. Facilitator checklists include fallbacks for proxy, PATH, and WSL issues.",
        },
      },
      {
        problem: "Role-specific relevance — target: 4.3+ (new metric)",
        analysis: "New per-day survey item: 'Today's content was relevant to my role' (1-5). Segment by role — if SAs rate lower than PEs, shared Days 1-3 need more SA application moments.",
        implementation: {
          label: "Four-path system with role-specific competencies per module",
          detail: "Each module shows role-specific outcomes. Adding the survey item captures whether learners feel the differentiation.",
        },
      },
    ],
    summary: "Cohort 2 succeeds if every participant arrives Day 1 with a working install, feels more confident each day, never hits a session below 4.2, rates content as relevant to their role (4.3+), and leaves Day 5 recommending the program to a colleague (NPS 50+).",
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
          <div style={st.eyebrow}>Interview questions</div>
          <div style={{ height: 2, width: 48, background: C.green, margin: "16px 0 32px", borderRadius: 1 }} />
          <h1 style={{ ...st.heroTitle, fontSize: 36 }}>Interview<br /><span style={{ color: C.green }}>questions.</span></h1>
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

        {/* Sections */}
      {FEEDBACK_RESPONSE.map((section, si) => (
        <div key={section.id} style={{ marginBottom: 56, ...st.fadeUp, animationDelay: `${0.15 + si * 0.08}s` }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 24 }}>
            <span style={{ fontFamily: "var(--serif)", fontSize: 42, color: C.green, lineHeight: 1, opacity: 0.25, flexShrink: 0 }}>{section.number}</span>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400, color: C.dark, margin: 0, lineHeight: 1.35 }}>{section.question}</h2>
          </div>

          {section.items.map((item, ii) => (
            <div key={ii} style={{ marginBottom: 28 }}>
              <h3 style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 600, color: C.dark, margin: "0 0 10px" }}>{item.problem}</h3>

              <div style={{ padding: "16px 20px", background: C.cream, borderRadius: 10, border: `1px solid ${C.lightGray}`, marginBottom: 12 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.green, marginBottom: 8 }}>What the data says</div>
                <p style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: C.muted, lineHeight: 1.7, margin: 0 }}>{item.analysis}</p>
              </div>

              <div style={{ padding: "16px 20px", background: C.bg, borderRadius: 10, border: `1px solid ${C.lightGray}`, borderLeft: `3px solid ${C.orange}` }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.orange, marginBottom: 8 }}>What we changed</div>
                <div style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 500, color: C.dark, marginBottom: 4 }}>{item.implementation.label}</div>
                <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>{item.implementation.detail}</p>
              </div>
            </div>
          ))}

          {section.signalVsNoise && (
            <div style={{ padding: "16px 20px", background: C.green + "06", borderRadius: 10, border: `1px solid ${C.green}20`, marginTop: 8 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.green, marginBottom: 8 }}>Signal vs. noise</div>
              <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>{section.signalVsNoise}</p>
            </div>
          )}

          {section.summary && (
            <div style={{ padding: "16px 20px", background: C.green + "06", borderRadius: 10, border: `1px solid ${C.green}20`, marginTop: 8 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.green, marginBottom: 8 }}>Success in one sentence</div>
              <p style={{ fontFamily: "var(--serif)", fontSize: 15, color: C.dark, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{section.summary}</p>
            </div>
          )}
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
