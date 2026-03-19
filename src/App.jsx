import { useState } from 'react';

// ─── BRAND TOKENS ───
const C = {
  bg: "#faf9f5", dark: "#141413", orange: "#d97757", blue: "#6a9bcc",
  green: "#788c5d", gray: "#b0aea5", lightGray: "#e8e6dc", cream: "#f5f3ee",
  text: "#141413", muted: "#6a685e", faint: "#b0aea5",
};

// ─── STYLES ───
const st = {
  page: { minHeight: "100vh", background: C.bg, color: C.dark, fontFamily: "var(--sans)" },
  container: { maxWidth: 640, margin: "0 auto", padding: "56px 28px 80px" },
  fadeUp: { opacity: 0, animation: "fadeUp 0.7s ease forwards" },
  eyebrow: { fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 2.5, color: C.faint, textTransform: "uppercase" },
  heroTitle: { fontFamily: "var(--serif)", fontSize: 42, fontWeight: 400, lineHeight: 1.12, margin: "0 0 20px", color: C.dark, letterSpacing: -0.5 },
  heroBody: { fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.7, color: C.muted, maxWidth: 500, margin: 0 },
  topBar: { position: "fixed", top: 0, left: 0, right: 0, background: C.bg, zIndex: 10, borderBottom: `1px solid ${C.lightGray}` },
  topBarInner: { maxWidth: 640, margin: "0 auto", padding: "10px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  tabRow: { maxWidth: 640, margin: "0 auto", padding: "0 28px", display: "flex" },
  tab: { fontFamily: "var(--sans)", fontSize: 12, background: "none", border: "none", borderBottom: "2px solid transparent", padding: "8px 14px", cursor: "pointer", transition: "all 0.2s", color: C.faint },
};

// ─── FEEDBACK DATA ───
const FEEDBACK_RESPONSE = [
  {
    id: "diagnosis",
    number: "01",
    question: "What are the biggest problems in this feedback?",
    items: [
      {
        problem: "We crammed too much into each day",
        analysis: "31% said pacing was \u2018too fast.\u2019 On its own, maybe that\u2019s just the less technical folks struggling. But then you look at confidence scores \u2014 dead flat across all three days (4.29, 4.28, 4.28). People aren\u2019t getting more confident as the week goes on. They wrote things like \u2018too much content packed into the day\u2019 and \u2018less content at a more reasonable pace.\u2019 When confidence doesn\u2019t budge despite three days of training, people are drowning in new material before the last batch has sunk in. The 67% who said pacing was fine? They came in with stronger technical backgrounds. The 31% are the people we\u2019re losing.",
        implementation: {
          label: "Spread it across 5 days, move lectures to pre-work",
          detail: "We went from 3 days to 5. That\u2019s ~40% less content per day. All the conceptual stuff \u2014 what is Claude Code, how does the model work, what\u2019s MCP \u2014 moved to self-paced reading people do before showing up. Live time is now 100% hands-on.",
        },
      },
      {
        problem: "Lecturing first, building second \u2014 backwards",
        analysis: "The Evals session scored 3.9 \u2014 half a point below average \u2014 and got the sharpest feedback in the whole dataset: \u2018too much time on abstract component taxonomy without enough concrete examples.\u2019 Same person said \u2018the build-along afterward was far more effective.\u2019 The interactive HTML presentation got the opposite reaction \u2014 people loved it because they could touch the tool and build while learning. The pattern is clear: when we talk at people, engagement tanks. When they build, it clicks.",
        implementation: {
          label: "Every session now starts with building, not talking",
          detail: "We killed the Evals session. Every day opens with a client problem and hands-on work. Day 1: \u2018Meridian Health\u2019s team takes 2-3 days per endpoint \u2014 show them how to do it in minutes.\u2019 Day 3: \u2018Arcadia Financial needs compliance gates \u2014 build it.\u2019 Eval concepts now live in the Applied Research track where people build working harnesses instead of reading taxonomy charts.",
        },
      },
      {
        problem: "People aren\u2019t feeling growth, and the content isn\u2019t role-specific",
        analysis: "Confidence flat. \u2018Apply independently\u2019 went up then back down (4.2, 4.5, 4.3). Day 3\u2019s \u2018realistic work simulation\u2019 score dropped to 3.9 \u2014 the most technical day felt the least connected to real work. People asked for \u2018more splits between SA, Engineer, Research\u2019 and \u2018guidance as to what is more relevant for each group.\u2019 When everyone sits through the same material regardless of their job, some of it just doesn\u2019t land.",
        implementation: {
          label: "Four role tracks with different outcomes per module",
          detail: "PE Pre-Sales, PE Post-Sales, SA, Applied Research \u2014 four tracks. Each module shows you a different outcome based on your role. A PE sees \u2018Demo the install to a prospect.\u2019 An SA sees \u2018Explain the value prop to a technical audience.\u2019 Day 4 splits into dedicated role breakouts. Skill badges give people a visible sense of progress.",
        },
      },
      {
        problem: "Install issues ate into Day 1",
        analysis: "Several people spent live session time fighting with their setup \u2014 npm issues, proxy problems, wrong versions. Every minute on that is a minute not spent on the actual training. Fixable.",
        implementation: {
          label: "Install happens before Day 1 now",
          detail: "Participants install the CLI, set up their IDE, and clone the repo as pre-work. Facilitator checklists have backup plans for proxy issues, PATH problems, and WSL quirks. Goal: zero install debugging during live time.",
        },
      },
    ],
    signalVsNoise: "Strong signal: pacing/overload (31% + qualitative + flat confidence), Evals bombing (3.9 + specific feedback), role differentiation gap (people asked for it), setup friction (specific, fixable). Weaker signal: Day 3 realism dip (3.9, one day), async preference (one person, but a real gap worth watching). The async request is legit but isn\u2019t a systemic problem when 67% said pacing was fine. Worth a light accommodation, not a redesign.",
  },
  {
    id: "changes",
    number: "02",
    question: "What would you change for the next cohort?",
    items: [
      { problem: "Sessions run wall-to-wall with no gaps", analysis: "Day 1 goes 0-5, 5-15, 15-30, 30-40, 40-45 \u2014 no room to breathe. Put a 15-minute open block after the midpoint. Questions, troubleshooting, ad-hoc demos \u2014 whatever the room needs. Not a break. A 45-minute session becomes 60 with no new content added. Call them \u2018consolidation blocks\u2019 in the facilitator guide so nobody fills them with more slides.", implementation: { label: "Facilitator guides flag timing and pacing risks", detail: "Every segment is timed to the minute with pacing notes. Named consolidation blocks aren\u2019t in the guide yet \u2014 that\u2019s the next iteration. Adding 15 minutes of open space after the midpoint is straightforward." } },
      { problem: "No way to verify setup before Day 1", analysis: "Everyone should pass a checklist before showing up: CLI installs, VS Code extension works, repo clones, one Claude Code command runs. If something fails, there\u2019s a 30-minute troubleshooting session the night before. Don\u2019t let Day 1 become an install debugging workshop.", implementation: { label: "Pre-work steps are in place; a hard gate is next", detail: "Module 1 walks through install, verify, IDE setup, and repo clone as pre-work. Facilitator checklists cover proxy and VPN fallbacks. An automated script that blocks attendance until setup passes would close the last gap." } },
      { problem: "One deck for everything", analysis: "The best-rated element was \u2018the HTML presentation with live examples.\u2019 Right now one deck covers all sessions. Each day should have its own interactive deck \u2014 embedded examples people can run, \u2018try it\u2019 pauses, animated diagrams.", implementation: { label: "We built a Basecamp deck; per-day decks are next", detail: "There\u2019s a 44-slide deck covering all 5 days with speaker notes on every slide. The shared design system makes it easy to spin up per-day decks. Days 4-5 don\u2019t use slides (role-play and capstone)." } },
      { problem: "Day 3 ends with talking instead of building", analysis: "Day 3 had the lowest \u2018realistic work simulation\u2019 score (3.9). The last 10 minutes are an architecture discussion. Replace it: \u2018Arcadia\u2019s compliance team just added a rule \u2014 no API calls without an audit trail. Extend your hooks.\u2019 Keep people building right through the end when energy is lowest.", implementation: { label: "Day 3 is now the heaviest lab day, framed around a real client", detail: "45 min live + 75 min lab \u2014 the longest hands-on block. Framed around Arcadia Financial, a fintech with 60 engineers and hard compliance requirements." } },
      { problem: "No way to measure confidence growth within a day", analysis: "Two-minute check at the start: \u2018Rate your confidence on today\u2019s skill, 1-5.\u2019 Same check at the end. Show the delta. Cross-day averages hide within-day growth.", implementation: { label: "Checkpoints and badges show qualitative growth", detail: "Reflection checkpoints and skill badges track progress. Adding a 1-5 rating at each checkpoint would give us the numbers." } },
      { problem: "Days 1-3 don\u2019t feel relevant to every role", analysis: "Drop in role-specific moments at transitions: \u2018Pre-Sales \u2014 notice how you\u2019d walk a prospect through this. SA \u2014 think about how this scales to 200 developers.\u2019 The content for this exists in the per-module competencies. The fix is making it a live habit for the facilitator.", implementation: { label: "Role competencies exist in the app; live callouts are next", detail: "Each module already has four different outcome statements by role. The app shows a personalized \u2018Your outcome\u2019 block. Turning these into facilitator talking points during live sessions is the remaining step." } },
      { problem: "No option for people who learn better solo", analysis: "One person asked for an async track. Don\u2019t build a whole parallel program for that \u2014 but do two things: record every session (available within 2 hours) and offer a 30-minute daily drop-in for people who want to work through it on their own.", implementation: { label: "Pre-work and Claude Chat cover part of this", detail: "30-45 min of self-paced pre-work per module. A Simplify toggle for different reading speeds. Claude Chat as always-on office hours. Recordings and structured drop-ins would finish the job." } },
    ],
  },
  {
    id: "measurement",
    number: "03",
    question: "How do you know if the changes worked?",
    items: [
      { problem: "Pacing \u2014 get \u2018Too fast\u2019 under 15% (was 31%)", analysis: "Ask the pacing question every day, not once at the end. \u2018Just right\u2019 should hit 75%+ on each day. If Day 3 still runs hot, stretch the buffer blocks on that day.", implementation: { label: "5-day format cuts daily density by ~40%", detail: "3 days became 5. Lectures moved to pre-work. Facilitator guides flag pacing risks segment by segment." } },
      { problem: "Confidence \u2014 should climb at least +0.5 over the week", analysis: "4.29, 4.28, 4.28 \u2014 that flat line was the loudest signal in the data. Measure it daily, same 1-5 scale. Day 1 should be the low point, each day higher. If it plateaus after Day 3, the customer scenario and capstone days aren\u2019t building enough real confidence.", implementation: { label: "Checkpoints and badges track growth", detail: "Reflection checkpoints and earnable badges show progress. A before/after confidence rating at each checkpoint would give us the slope." } },
      { problem: "Engagement \u2014 no session below 4.2 (Evals hit 3.9)", analysis: "3.9 was a clear miss. With build-first design across every session, nothing should drop that low. Measure per session, not per day. Anything under 4.0 gets the same treatment: cut the abstract framing, start with building.", implementation: { label: "No lecture-first sessions left in the program", detail: "Every session opens with a client problem and hands-on work. Interactive presentations replace slide decks." } },
      { problem: "\u2018Apply independently\u2019 \u2014 should end at 4.5+ (was 4.3)", analysis: "It went 4.2, 4.5, 4.3 \u2014 up then down. Over five days it should keep climbing. The Day 5 capstone is the real test: blind brief, no help, build and present. If that score is below 4.3, the middle days need to let go of the scaffolding sooner.", implementation: { label: "Day 5 capstone tests real independence", detail: "Blind customer brief, time limit, peer scoring. If someone can go from a cold brief to a working demo under pressure, they\u2019re ready." } },
      { problem: "NPS \u2014 target 50+ (was 35)", analysis: "35 with 18% detractors means some people were unhappy. Target: 50+ with detractors under 10% and promoters over 60%. Under 45 means the core problems aren\u2019t fixed. Over 55 means we nailed it.", implementation: { label: "NPS tells us if everything else worked", detail: "It\u2019s the final scorecard. Fix the structural issues, NPS follows." } },
      { problem: "Setup \u2014 zero live minutes on install problems", analysis: "Two things to track: how many people need install help during the live session (target: zero) and what percentage completed the pre-work checkpoint (target: 100%). If someone shows up without a working setup, the checkpoint process broke.", implementation: { label: "Install is pre-work now", detail: "CLI, IDE, and repo clone all happen before Day 1. Facilitator checklists cover the common failure modes." } },
      { problem: "Role relevance \u2014 new metric, target 4.3+", analysis: "Add a daily question: \u2018Today\u2019s content was relevant to my role\u2019 (1-5). Cut by role. If SAs score lower than PEs on Days 1-3, those days need more SA-flavored moments.", implementation: { label: "Four role paths with per-module outcomes", detail: "Each module shows role-specific outcomes. The survey question tells us whether people feel it." } },
    ],
    summary: "Cohort 2 works if everyone shows up Day 1 with a working install, grows more confident each day, never sits through a session below 4.2, feels the content is relevant to their job (4.3+), and walks out Day 5 telling a colleague to sign up (NPS 50+).",
  },
];

// ─── CURRICULUM PLAN CONTENT ───
function CurriculumPlanContent() {
  const sectionStyle = { marginBottom: 56 };
  const h1Style = { fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400, color: C.dark, margin: "0 0 8px", lineHeight: 1.25 };
  const h2Style = { fontFamily: "var(--serif)", fontSize: 20, fontWeight: 400, color: C.dark, margin: "32px 0 12px", lineHeight: 1.3 };
  const h3Style = { fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: C.muted, margin: "24px 0 8px" };
  const pStyle = { fontFamily: "var(--sans)", fontSize: 13.5, color: C.muted, lineHeight: 1.72, margin: "0 0 14px" };
  const bulletStyle = { fontFamily: "var(--sans)", fontSize: 13.5, color: C.muted, lineHeight: 1.72, margin: "0 0 8px", paddingLeft: 20, position: "relative" };
  const dot = { position: "absolute", left: 0, color: C.orange };
  const accentLine = (color) => ({ height: 2, width: 48, background: color, margin: "12px 0 24px", borderRadius: 1 });
  const tableHeader = { fontFamily: "var(--sans)", fontSize: 12, fontWeight: 600, color: "#fff", padding: "10px 14px", textAlign: "left" };
  const tableCell = { fontFamily: "var(--sans)", fontSize: 12, color: C.muted, padding: "10px 14px", borderBottom: `1px solid ${C.lightGray}`, lineHeight: 1.5, verticalAlign: "top" };

  const dayData = [
    { day: "Day 1", mod: "First Contact", focus: "Install, navigate, complete a first agentic task in terminal and IDE", artifact: "Working install + first agentic task recording + client talking points" },
    { day: "Day 2", mod: "Prompt Craft", focus: "CLAUDE.md authoring, session management, Plan Mode, prompt patterns", artifact: "CLAUDE.md template library + prompt pattern cheat sheet + before/after comparison" },
    { day: "Day 3", mod: "Extend & Customize", focus: "Hooks, MCP servers, slash commands, Agent SDK, composed workflows", artifact: "Custom hook + MCP server + slash command + integration architecture" },
    { day: "Day 4", mod: "Customer Scenarios", focus: "Security objections, deployment architecture, cost/ROI, competitive positioning", artifact: "Security FAQ + deployment template + competitive battlecard + demo scripts" },
    { day: "Day 5", mod: "Ship It (Capstone)", focus: "Blind brief \u2192 working demo \u2192 peer-reviewed presentation", artifact: "Client-tailored capstone presentation + working demo + peer feedback" },
  ];

  const modalityData = [
    { mod: "Day 1: First Contact", live: "45 min", lab: "45 min", self: "30 min pre-work", total: "~2 hrs" },
    { mod: "Day 2: Prompt Craft", live: "60 min", lab: "60 min", self: "30 min pre-work", total: "~2.5 hrs" },
    { mod: "Day 3: Extend", live: "45 min", lab: "75 min", self: "45 min pre-work", total: "~2.75 hrs" },
    { mod: "Day 4: Scenarios", live: "90 min", lab: "30 min", self: "None", total: "~2 hrs" },
    { mod: "Day 5: Capstone", live: "120 min", lab: "Integrated", self: "None", total: "~2 hrs" },
  ];

  return (
    <>
      {/* 1. CURRICULUM ARC */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 42, color: C.orange, lineHeight: 1, opacity: 0.25 }}>01</span>
          <h2 style={h1Style}>Curriculum Arc</h2>
        </div>
        <div style={accentLine(C.orange)} />
        <p style={pStyle}>Basecamp is a five-day, progressive curriculum where each day builds on the one before it. The program follows a deliberate arc: from individual tool proficiency (Days 1\u20133) to customer-facing skills (Day 4) to integrated performance under pressure (Day 5). Every session produces a concrete artifact the learner uses in the field.</p>

        <h3 style={h2Style}>Sequence and Progression</h3>
        <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.lightGray}`, margin: "16px 0 24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: C.orange }}><th style={tableHeader}>Day</th><th style={tableHeader}>Module</th><th style={tableHeader}>Core Focus</th><th style={tableHeader}>Artifact Produced</th></tr></thead>
            <tbody>
              {dayData.map((d, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? C.bg : C.cream }}>
                  <td style={{ ...tableCell, fontWeight: 600, color: C.dark, whiteSpace: "nowrap" }}>{d.day}</td>
                  <td style={{ ...tableCell, color: C.dark }}>{d.mod}</td>
                  <td style={tableCell}>{d.focus}</td>
                  <td style={tableCell}>{d.artifact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={h2Style}>How Each Session Builds on the Last</h3>
        <p style={pStyle}>The curriculum uses a scaffolded dependency chain. Each day\u2019s skills are prerequisites for the next:</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Day 1 \u2192 Day 2:</strong> You must have Claude Code installed and understand the agentic loop before you can learn to steer it with CLAUDE.md and prompt patterns.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Day 2 \u2192 Day 3:</strong> CLAUDE.md conventions and prompt craft are prerequisites for hooks (which enforce conventions) and MCP (which extends Claude\u2019s capabilities). Without Day 2\u2019s mental model, hooks and MCP are just configuration files.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Day 3 \u2192 Day 4:</strong> Technical depth in the product (Days 1\u20133) gives you the credibility to handle security objections, architecture questions, and competitive positioning. You can\u2019t answer a CISO\u2019s questions about sandboxing if you\u2019ve never configured a hook.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Day 4 \u2192 Day 5:</strong> The capstone integrates everything. You receive a blind brief and must install, configure, build, and present \u2014 drawing on every prior day. Day 4\u2019s customer conversation practice gives you the presentation and objection-handling skills the capstone requires.</p>

        <h3 style={h2Style}>Competency Milestones</h3>
        <p style={pStyle}>The program tracks progress through two systems:</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Credentials (10 total):</strong> Earned by completing module exercises. Examples include CLI Navigation, Prompt Architecture, MCP Integration, Competitive Positioning, and Live Demo Delivery. These are visible on the hub page as collectible badges.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Knowledge Checkpoints:</strong> Two reflection questions per module that test recall and application. Self-scored with expandable hints.</p>
        <p style={pStyle}>The credential system provides a sense of progression and makes competency gaps visible. A learner who has all Day 1\u20133 badges but is missing Competitive Positioning knows exactly what to review before a customer conversation.</p>
      </div>

      {/* 2. AUDIENCE DIFFERENTIATION */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 42, color: C.blue, lineHeight: 1, opacity: 0.25 }}>02</span>
          <h2 style={h1Style}>Audience Differentiation</h2>
        </div>
        <div style={accentLine(C.blue)} />
        <p style={pStyle}>Basecamp serves four roles with significantly different customer touchpoints, technical depths, and success metrics. The curriculum handles this through a shared-foundation / role-specific-breakout model.</p>

        <h3 style={h2Style}>Shared Sessions (Days 1\u20133)</h3>
        <p style={pStyle}>Days 1\u20133 are shared across all roles. Every participant builds the same technical foundation on Claude Code \u2014 install, CLAUDE.md, prompt craft, hooks, MCP, and composed workflows. This is intentional:</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Credibility requires depth.</strong> A Pre-Sales PE who can\u2019t explain hooks loses the room when a customer asks about guardrails. An SA who has never written a CLAUDE.md can\u2019t design an adoption strategy.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Cross-role learning.</strong> When a Pre-Sales PE and a Post-Sales PE work through the same lab, they develop shared vocabulary and see each other\u2019s perspectives.</p>

        <h3 style={h2Style}>Role-Specific Differentiation</h3>
        <p style={pStyle}>Differentiation happens in three ways:</p>

        <h3 style={h3Style}>1. Role-specific competency outcomes (all modules)</h3>
        <p style={pStyle}>Every module defines a different competency target for each role. For example, Day 2 (Prompt Craft):</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>PE Pre-Sales:</strong> Write a CLAUDE.md for a prospect\u2019s repo during a live evaluation, showing how context transforms output quality.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>PE Post-Sales:</strong> Pair-program with a customer engineering team to author CLAUDE.md files tailored to their codebase and CI/CD pipeline.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Solutions Architect:</strong> Design a CLAUDE.md strategy for a multi-team engineering org \u2014 root-level standards, team-level overrides, integration patterns.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Applied Research:</strong> Evaluate how CLAUDE.md content affects model reasoning quality and build evaluation harnesses to measure impact.</p>

        <h3 style={h3Style}>2. Role-specific breakouts (Day 4)</h3>
        <p style={pStyle}>Day 4 is the primary role-divergence day. The three customer scenarios are weighted differently by role:</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>PE Pre-Sales:</strong> Focus on competitive positioning. Practice the honest differentiation pitch.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>PE Post-Sales:</strong> Focus on deployment architecture. Practice scoping and estimating real implementations.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Solutions Architects:</strong> All three scenarios equally weighted. Practice the full customer conversation spectrum.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Applied Research:</strong> Focus on technical depth. Practice honest capability assessment.</p>

        <h3 style={h3Style}>3. Capstone brief selection (Day 5)</h3>
        <p style={pStyle}>Capstone briefs are matched to role. A Pre-Sales PE receives a brief that requires a compelling demo and clear next-steps ask. A Post-Sales PE receives a brief that requires a working implementation and handoff documentation. An SA receives a brief that requires an adoption strategy with architecture diagrams and ROI estimates.</p>

        <h3 style={h2Style}>Handling Varying Technical Depth</h3>
        <p style={pStyle}>The cohort will include people who write code daily and people who haven\u2019t opened a terminal in months. Three design choices address this:</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Simplify toggle:</strong> Every content page has a \u201cSimplify\u201d button that swaps technical language for plain-English explanations.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Contextual exercises:</strong> Steps are tagged by context (terminal, VS Code, Claude, browser). Participants comfortable in the terminal move faster.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Facilitator guide pacing notes:</strong> The facilitator guide for each module includes pacing advice for mixed-depth rooms.</p>
      </div>

      {/* 3. LEARNING MODALITIES */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 42, color: C.green, lineHeight: 1, opacity: 0.25 }}>03</span>
          <h2 style={h1Style}>Learning Modalities</h2>
        </div>
        <div style={accentLine(C.green)} />
        <p style={pStyle}>Each module uses a deliberate mix of live instruction, hands-on labs, and self-paced materials. The ratio shifts across the week as learners build independence.</p>

        <h3 style={h2Style}>Modality Breakdown by Day</h3>
        <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.lightGray}`, margin: "16px 0 24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: C.blue }}>{["Module", "Live", "Lab", "Self-Paced", "Total"].map(h => <th key={h} style={tableHeader}>{h}</th>)}</tr></thead>
            <tbody>
              {modalityData.map((d, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? C.bg : C.cream }}>
                  <td style={{ ...tableCell, fontWeight: 600, color: C.dark }}>{d.mod}</td>
                  <td style={tableCell}>{d.live}</td>
                  <td style={tableCell}>{d.lab}</td>
                  <td style={tableCell}>{d.self}</td>
                  <td style={{ ...tableCell, fontWeight: 500 }}>{d.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={h2Style}>Live Instruction</h3>
        <p style={pStyle}>Live sessions are facilitator-led and focus on demonstration, narration, and discussion \u2014 never lecture. The facilitator guide for each module includes:</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> Timed segments with narration scripts (what to say as you demo, word for word)</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> Setup checklists (repos to clone, tools to pre-install, backup plans)</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> Key moments to highlight (e.g., \u201cWhen Claude self-corrects after a test failure \u2014 don\u2019t skip this\u201d)</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> Pacing notes for mixed-depth rooms</p>
        <p style={pStyle}>Live sessions follow the \u201cI do, we do, you do\u201d progression: facilitator demos first, then the group works together, then individuals tackle the lab independently.</p>

        <h3 style={h2Style}>Hands-On Labs</h3>
        <p style={pStyle}>Labs are structured as step-by-step walkthroughs embedded directly in the web application. Each step includes:</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> A description of what to do and why</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> Copy-pasteable commands (with a copy button for terminal commands)</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> Expected output so learners can self-verify</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> Tips for common pitfalls and material references</p>
        <p style={pStyle}>Labs are framed through client scenarios. Day 1\u2019s lab isn\u2019t \u201cinstall Claude Code\u201d \u2014 it\u2019s \u201cyou\u2019re onboarding Meridian Health\u2019s backend team and delivering their first win.\u201d</p>

        <h3 style={h2Style}>Leave-Behind Reference Materials</h3>
        <p style={pStyle}>The program includes 22 printable materials across three categories:</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Grab and Go (5 cards):</strong> Claude Code at a Glance, How Claude Code Thinks, Security Objection Handler, Claude Code vs. Competition, and Cost & ROI Pocket Math.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Module Worksheets (10 items):</strong> CLAUDE.md Builder worksheet, Prompt Patterns cheat sheet, Integration Patterns architecture reference, Demo Planning worksheet, etc.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Deep Reference (7 items):</strong> Deployment Path Finder, Enterprise Deployment talk track, Configuration & Customization reference, and others.</p>
      </div>

      {/* 4. COMPETENCY OUTCOMES */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 42, color: C.orange, lineHeight: 1, opacity: 0.25 }}>04</span>
          <h2 style={h1Style}>Competency Outcomes</h2>
        </div>
        <div style={accentLine(C.orange)} />
        <p style={pStyle}>These are what each role should be able to <em>do</em> \u2014 not just know \u2014 by the end of the program. Each outcome is tied to a specific day\u2019s module.</p>

        {[
          { role: "PE Pre-Sales", color: C.orange, outcomes: [
            { day: "Day 1", text: "Demo Claude Code\u2019s install and first-run experience to a prospect \u2014 narrate the agentic loop as it happens and explain why it matters vs. autocomplete." },
            { day: "Day 2", text: "Write a CLAUDE.md for a prospect\u2019s repo during a live evaluation, showing how context transforms output quality." },
            { day: "Day 3", text: "Architect a Claude Code integration pattern for a customer evaluation \u2014 hooks for guardrails, MCP for their internal tools, slash commands for team workflows." },
            { day: "Day 4", text: "Run a full technical evaluation against a real customer use case \u2014 build a reference architecture, handle objections on security and cost, position against Copilot/Cursor/Devin, and close with a next-steps demo plan." },
            { day: "Day 5", text: "Deliver a compelling, tailored Claude Code demo from a cold customer brief in under 2 hours \u2014 including architecture proposal, live demo, and a clear next-steps ask." },
          ]},
          { role: "PE Post-Sales", color: C.blue, outcomes: [
            { day: "Day 1", text: "Set up Claude Code in a customer\u2019s dev environment, troubleshoot common installation issues, and guide a developer through their first agentic task." },
            { day: "Day 2", text: "Pair-program with a customer engineering team to author CLAUDE.md files tailored to their codebase, conventions, and CI/CD pipeline." },
            { day: "Day 3", text: "Build and deploy custom MCP servers, hooks, and slash commands in a customer\u2019s environment \u2014 debugging integration issues live." },
            { day: "Day 4", text: "Navigate a live customer debugging session using Claude Code \u2014 diagnose a failing integration, fix it with the customer watching, and turn the save into a relationship-building moment." },
            { day: "Day 5", text: "Scope, build, and deliver a working Claude Code implementation from a customer brief \u2014 pair-program through the hard parts, leave behind documentation, and hand off a running system." },
          ]},
          { role: "Solutions Architects", color: C.green, outcomes: [
            { day: "Day 1", text: "Articulate the agentic coding value proposition to a technical audience and map it to common customer pain points." },
            { day: "Day 2", text: "Design a CLAUDE.md strategy for a multi-team engineering org \u2014 root-level standards, team-level overrides, and integration patterns with existing style guides." },
            { day: "Day 3", text: "Design a phased Claude Code adoption plan \u2014 from individual pilot to team-wide deployment \u2014 with integration patterns for the customer\u2019s existing toolchain." },
            { day: "Day 4", text: "Assess a customer\u2019s engineering org, identify the highest-leverage Claude Code insertion points, position honestly against competitors, and present a strategic adoption roadmap." },
            { day: "Day 5", text: "Present a complete Claude Code adoption strategy from a blind customer brief \u2014 architecture diagrams, phased rollout, integration patterns, ROI estimates, and honest risk assessment." },
          ]},
          { role: "Applied Research", color: C.muted, outcomes: [
            { day: "Day 1", text: "Analyze Claude Code\u2019s agentic loop behavior \u2014 tool calls, planning steps, error recovery \u2014 and identify areas where model capabilities could be extended." },
            { day: "Day 2", text: "Evaluate how CLAUDE.md content affects model reasoning quality, identify prompt patterns that improve code generation accuracy, and build evaluation harnesses." },
            { day: "Day 3", text: "Build custom tooling with the Agent SDK \u2014 automated code review pipelines, evaluation harnesses, and workflows that connect Claude Code to model training infrastructure." },
            { day: "Day 4", text: "Advise on Claude Code\u2019s capabilities and limitations for ML/training workflows \u2014 propose custom tooling workarounds and scope what\u2019s possible vs. what requires model-level changes." },
            { day: "Day 5", text: "Design and present a Claude Code-powered research workflow \u2014 custom Agent SDK tooling, evaluation metrics, integration with training pipelines \u2014 with a working prototype." },
          ]},
        ].map((group, gi) => (
          <div key={gi} style={{ margin: "28px 0" }}>
            <h3 style={{ ...h2Style, marginTop: gi === 0 ? 20 : 32 }}>
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: group.color, marginRight: 10, verticalAlign: "middle" }} />
              {group.role}
            </h3>
            {group.outcomes.map((o, oi) => (
              <div key={oi} style={{ display: "flex", gap: 12, marginBottom: 10, paddingLeft: 4 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: group.color, flexShrink: 0, minWidth: 42, paddingTop: 2 }}>{o.day}</span>
                <p style={{ ...pStyle, margin: 0 }}>{o.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 5. RATIONALE */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 42, color: C.blue, lineHeight: 1, opacity: 0.25 }}>05</span>
          <h2 style={h1Style}>Rationale</h2>
        </div>
        <div style={accentLine(C.blue)} />

        <h3 style={h2Style}>Why This Sequence</h3>
        <p style={pStyle}>The five-day arc follows the Dreyfus model of skill acquisition: novice \u2192 advanced beginner \u2192 competent \u2192 proficient \u2192 expert.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Days 1\u20132 (Novice \u2192 Advanced Beginner):</strong> Learners follow rules. Install Claude Code, learn the commands, write a CLAUDE.md by template. Success is defined by following the steps correctly.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Day 3 (Competent):</strong> Learners make decisions. Which hooks to configure, which MCP servers to connect, how to compose them. Success requires judgment, not just execution.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Day 4 (Proficient):</strong> Learners handle ambiguity. Customer objections don\u2019t follow scripts. The security conversation requires reading the room; the competitive conversation requires honest differentiation.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Day 5 (Expert):</strong> Learners integrate everything under pressure. A blind brief, a time constraint, a live audience. This is as close as we can get to the real job without being in the field.</p>
        <p style={pStyle}>This progression also follows experiential learning theory (Kolb): concrete experience \u2192 reflective observation \u2192 abstract conceptualization \u2192 active experimentation. Each module completes this cycle.</p>

        <h3 style={h2Style}>Key Trade-offs</h3>
        {[
          { title: "Shared Days 1\u20133 vs. earlier role divergence", text: "I chose shared sessions for the first three days despite the audience having different technical depths. The alternative \u2014 splitting into technical and non-technical tracks on Day 1 \u2014 would mean Pre-Sales PEs never build the hands-on depth needed to handle technical customer conversations. The \u201cSimplify\u201d toggle and facilitator pacing notes mitigate the mixed-depth challenge without sacrificing depth for anyone." },
          { title: "Client scenarios as framing vs. abstract exercises", text: "Every module is framed through a realistic client scenario (Meridian Health, Lumen Logistics, Arcadia Financial, etc.) rather than abstract exercises. This costs development time \u2014 each scenario needs a believable company, industry context, and problem statement. The payoff: learners practice the actual cognitive work of a customer engagement rather than just learning features in isolation." },
          { title: "Single-file React app vs. a more scalable architecture", text: "The application is built as a single App.jsx file. This was a deliberate choice for a portfolio piece that needs to be instantly understandable and deployable. For a production curriculum platform, I would split into components, add a proper router, and likely use a content management system for the curriculum data." },
          { title: "Depth on Day 2 (CLAUDE.md) vs. distributing across days", text: "Day 2 is the deepest module (17 steps with facilitator narration scripts). I chose to invest heavily here because the CLAUDE.md before/after demo is the single most persuasive moment in the entire program. It\u2019s the demo every PE will run in their first customer conversation. Getting this day right has outsized impact on field readiness." },
        ].map((item, i) => (
          <div key={i} style={{ background: C.cream, borderRadius: 12, border: `1px solid ${C.lightGray}`, padding: "20px 24px", marginBottom: 16 }}>
            <h4 style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600, color: C.dark, margin: "0 0 8px" }}>{item.title}</h4>
            <p style={{ ...pStyle, margin: 0 }}>{item.text}</p>
          </div>
        ))}

        <h3 style={h2Style}>What I\u2019d Do Differently with More Time</h3>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Video walkthroughs:</strong> Pre-recorded facilitator demos for each module, so learners can watch the \u201cideal\u201d run before attempting it themselves.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Quantitative confidence measurement:</strong> Add a 1\u20135 confidence self-rating before and after each module.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Real MCP server for Day 3:</strong> The current lab uses a mock Jira server. With more time, I\u2019d provision a real sandbox Jira instance.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Alumni community and feedback loop:</strong> A Slack channel or Notion database where Basecamp graduates share field reports.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Adaptive difficulty:</strong> Use the credential system to unlock advanced paths for strong performers.</p>
        <p style={bulletStyle}><span style={dot}>{"\u2022"}</span> <strong>Localization and async delivery:</strong> Build an async-first version with video content, auto-graded exercises, and optional live office hours.</p>
      </div>
    </>
  );
}

// ─── COHORT 1 FEEDBACK CONTENT ───
function CohortFeedbackContent() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, margin: "0 0 40px" }}>
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

      <div style={{ borderTop: `1px solid ${C.lightGray}`, paddingTop: 24, marginTop: 20 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.faint, marginBottom: 10 }}>Summary of feedback coverage</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["Pacing / content overload", "Flat confidence (no ramp)", "Evals low engagement", "Day 3 realism drop", "Role-specific differentiation", "Setup friction", "Async/solo learner gap", "Build-first vs. abstract-first", "Interactive presentations", "Hands-on > lecture"].map((tag, i) => (
            <span key={i} style={{ fontFamily: "var(--mono)", fontSize: 9, padding: "4px 10px", borderRadius: 14, border: `1px solid ${C.green}30`, color: C.green, background: C.green + "08" }}>{tag}</span>
          ))}
        </div>
        <p style={{ fontFamily: "var(--sans)", fontSize: 12, color: C.faint, marginTop: 16, lineHeight: 1.5 }}>
          Each tag above is addressed in at least one diagnosis, change, and measurement section.
        </p>
      </div>
    </>
  );
}

// ─── MAIN APP ───
export default function App() {
  const [activeTab, setActiveTab] = useState("part1");

  return (
    <div style={st.page}>
      <div style={st.topBar}>
        <div style={st.topBarInner}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: C.faint, textTransform: "uppercase" }}>Claude Code Basecamp</div>
          <div style={{ width: 48 }} />
        </div>
        <div style={st.tabRow}>
          <button onClick={() => { setActiveTab("part1"); window.scrollTo({ top: 0, behavior: "instant" }); }} style={{ ...st.tab, color: activeTab === "part1" ? C.orange : C.faint, borderBottomColor: activeTab === "part1" ? C.orange : "transparent", fontWeight: activeTab === "part1" ? 500 : 400 }}>Part 1: Curriculum Plan</button>
          <button onClick={() => { setActiveTab("cohort1"); window.scrollTo({ top: 0, behavior: "instant" }); }} style={{ ...st.tab, color: activeTab === "cohort1" ? C.green : C.faint, borderBottomColor: activeTab === "cohort1" ? C.green : "transparent", fontWeight: activeTab === "cohort1" ? 500 : 400 }}>Part 2: Cohort 1 Feedback</button>
        </div>
      </div>

      <div style={{ ...st.container, paddingTop: 100 }}>
        {activeTab === "part1" && (
          <div key="part1">
            <div style={{ ...st.fadeUp, marginBottom: 40 }}>
              <div style={st.eyebrow}>Part 1 · Written curriculum plan</div>
              <div style={{ height: 2, width: 48, background: C.orange, margin: "16px 0 32px", borderRadius: 1 }} />
              <h1 style={{ ...st.heroTitle, fontSize: 36 }}>Curriculum<br /><span style={{ color: C.orange }}>plan.</span></h1>
              <p style={st.heroBody}>A five-day structured onboarding track for GTM teams \u2014 PE Pre-Sales, PE Post-Sales, Solutions Architects, and Applied Research \u2014 building from first install to job-ready customer engagements.</p>
              <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
                {["Arc & Sequence", "Audience", "Modalities", "Outcomes", "Rationale"].map((label, i) => (
                  <span key={i} style={{ fontFamily: "var(--mono)", fontSize: 9, padding: "4px 10px", borderRadius: 14, border: `1px solid ${C.orange}30`, color: C.orange, background: C.orange + "08" }}>{label}</span>
                ))}
              </div>
            </div>
            <CurriculumPlanContent />
          </div>
        )}

        {activeTab === "cohort1" && (
          <div key="cohort1">
            <div style={{ ...st.fadeUp, marginBottom: 40 }}>
              <div style={st.eyebrow}>Part 2 · Cohort 1 feedback analysis</div>
              <div style={{ height: 2, width: 48, background: C.green, margin: "16px 0 32px", borderRadius: 1 }} />
              <h1 style={{ ...st.heroTitle, fontSize: 36 }}>Feedback<br /><span style={{ color: C.green }}>response.</span></h1>
              <p style={st.heroBody}>A written analysis of Cohort 1 program feedback (NPS: 35, n=17). Each section presents the question asked, the answer grounded in the data provided, and how the current program design addresses the finding.</p>
            </div>
            <CohortFeedbackContent />
          </div>
        )}
      </div>
    </div>
  );
}
