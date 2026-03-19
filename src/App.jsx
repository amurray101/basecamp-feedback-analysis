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
    question: "What are the biggest problems in this feedback? How would you change it for the next cohort?",
    items: [
      {
        problem: "Too much content per day",
        analysis: "31% said pacing was too fast and confidence scores were flat across all three days (4.29, 4.28, 4.28) — people weren't getting more confident as the week went on. Multiple respondents said some version of 'too much content packed into the day.' We were putting more into each session than people could absorb. Those who fared better likely had stronger technical backgrounds coming in, but we need to design for everyone.",
        implementation: {
          label: "Expanded from 3 days to 5, moved lectures to pre-work",
          detail: "The program runs 5 days now instead of 3 — about 40% less content per day. Conceptual material is moved to self-paced pre-work, leaving live time to focus on hands-on exercises.",
        },
      },
      {
        problem: "Lectures before building doesn't work",
        analysis: "The Evals session scored 3.9 engagement — half a point below average. The feedback was specific: 'too much time on abstract component taxonomy without enough concrete examples.' Same person said 'the build-along afterward was far more effective.' Sessions where people got hands-on and built themselves scored higher than listening-only lectures.",
        implementation: {
          label: "Every session starts with building now",
          detail: "Every day opens with a client scenario and hands-on work. Day 1: 'Meridian Health takes 2-3 days per endpoint — show them how to do it in minutes.' Day 3: 'Arcadia Financial needs compliance gates — build it.' Eval concepts moved to the Applied Research track where people build working harnesses instead of reading taxonomy charts.",
        },
      },
      {
        problem: "No sense of progress, no role differentiation",
        analysis: "Confidence flat. 'Apply independently' went up then back down (4.2, 4.5, 4.3) — it should just go up. Day 3 'realistic work simulation' dropped to 3.9 from 4.3-4.4 on Days 1-2, meaning the most technical day felt the least connected to actual work. People asked for 'more splits between SA, Engineer, Research' and 'guidance as to what is more relevant for each group.' A single curriculum for all roles means some content doesn't map to some people's jobs.",
        implementation: {
          label: "Four role tracks with different outcomes per module",
          detail: "PE Pre-Sales, PE Post-Sales, Solutions Architect, Applied Research. Each module shows a role-specific outcome — a PE sees 'Demo the install to a prospect,' an SA sees 'Explain the value prop to a technical audience.' Day 4 splits into role-specific breakouts. Skill badges give people a way to see their progress.",
        },
      },
      {
        problem: "Install issues during live sessions",
        analysis: "Several people spent Day 1 lab time fighting their setup — npm, proxy, version issues. Time spent on that is time not spent on the training.",
        implementation: {
          label: "Install happens as pre-work now",
          detail: "CLI install, IDE setup, and repo clone all happen before Day 1. Facilitator checklists include fallback plans for proxy, PATH, and WSL issues. Goal is zero install debugging during live time.",
        },
      },
    ],
    signalVsNoise: "Some of this feedback points to real structural problems. Some of it is individual preference. Here's how we separated the two. The clearest problems — the ones we're most confident need fixing — showed up in multiple places at once. Pacing and overload appeared in the survey numbers (31% said too fast), in the written comments ('too much content'), and in the confidence data (flat across all three days). When three different data sources say the same thing, that's a real problem. The Evals session scored low (3.9) and got specific, actionable feedback about what went wrong — that's a real problem. People asked for role-specific content in their own words — that's a real gap. Setup friction showed up in multiple reports and has a clear fix — that's worth addressing. Other feedback was real but narrower. Day 3's realism score dipped to 3.9, but it was one day and one metric — worth watching, not worth redesigning around. One person asked for a fully async track. That's a valid preference and points to a real learning style gap, but 67% said pacing was fine in the live format. We addressed it with a light-touch accommodation (self-paced pre-work, Claude Chat for on-demand help) rather than building a parallel program.",
  },
  {
    id: "measurement",
    number: "02",
    question: "How do you know if the changes worked?",
    items: [
      {
        problem: "NPS — target 50+ (was 35)",
        analysis: "The single best measure of whether the program works as a whole. 35 with 18% detractors means people left unsatisfied. Target: 50+ with detractors under 10% and promoters over 60%. Under 45 means the core problems aren't fixed.",
      },
      {
        problem: "Day-over-day confidence slope",
        analysis: "Cohort 1 was flat: 4.29, 4.28, 4.28. The number that matters isn't the absolute score — it's the slope. Measure daily on the same 1-5 scale. Day 1 should be lowest, each day higher. A flat or declining line means the program isn't building felt mastery, regardless of what the content covers.",
      },
      {
        problem: "Per-session engagement floor — no session below 4.2",
        analysis: "The Evals session hit 3.9. Measure engagement per session, not per day — a strong morning can mask a weak afternoon. Any session below 4.0 is a structural problem with that session, not a fluke.",
      },
      {
        problem: "30-day field application rate",
        analysis: "The metric that matters most and the one Cohort 1 didn't track: are people using what they learned? Survey participants 30 days after the program. Ask: 'Have you used Claude Code in a customer conversation, demo, or deployment since Basecamp?' and 'Which specific skills from the program have you applied?' A training program that scores well on day-of surveys but doesn't change behavior in the field hasn't worked.",
      },
      {
        problem: "Time to first customer use",
        analysis: "How many days after completing Basecamp does someone use Claude Code with a customer for the first time? Shorter is better. If people leave Day 5 feeling ready but don't use it for six weeks, there's a transfer gap between the training environment and the real one.",
      },
      {
        problem: "Pre-work completion rate — target 100%",
        analysis: "If people show up without doing the pre-work, the live session breaks down — the facilitator ends up lecturing on material that should have been read. Track completion. If it drops below 90%, the pre-work is either too long, too hard to access, or not seen as valuable.",
      },
      {
        problem: "Role relevance — target 4.3+",
        analysis: "New daily question: 'Today's content was relevant to my role' (1-5). Segment by role. If SAs score lower than PEs on shared days, those days need more SA-relevant framing. This tells us whether the four-path system is landing or just decorative.",
      },
    ],
    summary: "Cohort 2 works if NPS hits 50+, confidence climbs each day, no session scores below 4.2, and — most importantly — people are using Claude Code with customers within 30 days of finishing the program.",
  },
]


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
    { day: "Day 5", mod: "Ship It (Capstone)", focus: "Blind brief → working demo → peer-reviewed presentation", artifact: "Client-tailored capstone presentation + working demo + peer feedback" },
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
      {/* 0. COMMON CORE */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 42, color: C.muted, lineHeight: 1, opacity: 0.25 }}>00</span>
          <h2 style={h1Style}>Common Core</h2>
        </div>
        <div style={accentLine(C.muted)} />
        <p style={pStyle}>Before the curriculum splits into role-specific tracks, every participant goes through a shared common core that establishes three foundations: Anthropic as a company, the product suite, and Claude Code as a tool.</p>
        <p style={pStyle}>The first layer is Anthropic itself — its mission, its approach to AI safety, and the values that shape how the company builds and ships products. This matters because every person in a GTM role represents these ideas to customers. When a PE talks about Claude's design choices or an SA explains why a feature works the way it does, they need to speak from genuine understanding, not marketing copy. The common core covers Anthropic's responsible scaling commitments, its research-driven culture, and how those values translate into product decisions that participants will need to articulate in the field.</p>
        <p style={pStyle}>The second layer is the Anthropic product suite — Claude (the model family), the API, Claude for Enterprise, and how Claude Code fits within that ecosystem. Participants need to understand where Claude Code sits relative to the rest of the platform: what problems it solves that the API alone doesn't, how it complements Claude for Enterprise deployments, and how to position it alongside other Anthropic products in a customer conversation. This prevents the common failure mode where someone can demo Claude Code but can't answer "how does this relate to the Claude API we're already using?"</p>
        <p style={pStyle}>The third layer — and the one that takes the most time — is a comprehensive, hands-on overview of Claude Code itself. Before anyone learns role-specific applications, they need to understand the product deeply: the agentic architecture, the tool-use loop, how context windows work in practice, the permission model, CLAUDE.md conventions, and the extension points (hooks, MCP, slash commands, Agent SDK). This is the technical foundation that every subsequent module builds on. A Pre-Sales PE, a Post-Sales PE, a Solutions Architect, and an Applied Researcher all need this same depth — they just apply it differently. The common core ensures everyone shares a baseline vocabulary and mental model before the curriculum begins to differentiate.</p>
      </div>

      {/* 1. CURRICULUM ARC */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 42, color: C.orange, lineHeight: 1, opacity: 0.25 }}>01</span>
          <h2 style={h1Style}>Curriculum Arc</h2>
        </div>
        <div style={accentLine(C.orange)} />
        <p style={pStyle}>Basecamp is a five-day, progressive curriculum where each day builds on the one before it. The program follows a deliberate arc: from individual tool proficiency (Days 1–3) to customer-facing skills (Day 4) to integrated performance under pressure (Day 5). Every session produces a concrete artifact the learner uses in the field.</p>

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
        <p style={pStyle}>The curriculum uses a scaffolded dependency chain. Each day’s skills are prerequisites for the next:</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Day 1 → Day 2:</strong> You must have Claude Code installed and understand the agentic loop before you can learn to steer it with CLAUDE.md and prompt patterns.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Day 2 → Day 3:</strong> CLAUDE.md conventions and prompt craft are prerequisites for hooks (which enforce conventions) and MCP (which extends Claude’s capabilities). Without Day 2’s mental model, hooks and MCP are just configuration files.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Day 3 → Day 4:</strong> Technical depth in the product (Days 1–3) gives you the credibility to handle security objections, architecture questions, and competitive positioning. You can’t answer a CISO’s questions about sandboxing if you’ve never configured a hook.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Day 4 → Day 5:</strong> The capstone integrates everything. You receive a blind brief and must install, configure, build, and present — drawing on every prior day. Day 4’s customer conversation practice gives you the presentation and objection-handling skills the capstone requires.</p>

        <h3 style={h2Style}>Competency Milestones</h3>
        <p style={pStyle}>The program tracks progress through two systems:</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Credentials (10 total):</strong> Earned by completing module exercises. Examples include CLI Navigation, Prompt Architecture, MCP Integration, Competitive Positioning, and Live Demo Delivery. These are visible on the hub page as collectible badges.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Knowledge Checkpoints:</strong> Two reflection questions per module that test recall and application. Self-scored with expandable hints.</p>
        <p style={pStyle}>The credential system provides a sense of progression and makes competency gaps visible. A learner who has all Day 1–3 badges but is missing Competitive Positioning knows exactly what to review before a customer conversation.</p>
      </div>

      {/* 2. AUDIENCE DIFFERENTIATION */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 42, color: C.blue, lineHeight: 1, opacity: 0.25 }}>02</span>
          <h2 style={h1Style}>Audience Differentiation</h2>
        </div>
        <div style={accentLine(C.blue)} />
        <p style={pStyle}>Basecamp serves four roles with significantly different customer touchpoints, technical depths, and success metrics. The curriculum handles this through a shared-foundation / role-specific-breakout model.</p>

        <h3 style={h2Style}>Shared Sessions (Days 1–3)</h3>
        <p style={pStyle}>Days 1–3 are shared across all roles. Every participant builds the same technical foundation on Claude Code — install, CLAUDE.md, prompt craft, hooks, MCP, and composed workflows. This is intentional:</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Credibility requires depth.</strong> A Pre-Sales PE who can’t explain hooks loses the room when a customer asks about guardrails. An SA who has never written a CLAUDE.md can’t design an adoption strategy.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Cross-role learning.</strong> When a Pre-Sales PE and a Post-Sales PE work through the same lab, they develop shared vocabulary and see each other’s perspectives.</p>

        <h3 style={h2Style}>Role-Specific Differentiation</h3>
        <p style={pStyle}>Differentiation happens in three ways:</p>

        <h3 style={h3Style}>1. Role-specific competency outcomes (all modules)</h3>
        <p style={pStyle}>Every module defines a different competency target for each role. For example, Day 2 (Prompt Craft):</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>PE Pre-Sales:</strong> Write a CLAUDE.md for a prospect’s repo during a live evaluation, showing how context transforms output quality.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>PE Post-Sales:</strong> Pair-program with a customer engineering team to author CLAUDE.md files tailored to their codebase and CI/CD pipeline.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Solutions Architect:</strong> Design a CLAUDE.md strategy for a multi-team engineering org — root-level standards, team-level overrides, integration patterns.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Applied Research:</strong> Evaluate how CLAUDE.md content affects model reasoning quality and build evaluation harnesses to measure impact.</p>

        <h3 style={h3Style}>2. Role-specific breakouts (Day 4)</h3>
        <p style={pStyle}>Day 4 is the primary role-divergence day. The three customer scenarios are weighted differently by role:</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>PE Pre-Sales:</strong> Focus on competitive positioning. Practice the honest differentiation pitch.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>PE Post-Sales:</strong> Focus on deployment architecture. Practice scoping and estimating real implementations.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Solutions Architects:</strong> All three scenarios equally weighted. Practice the full customer conversation spectrum.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Applied Research:</strong> Focus on technical depth. Practice honest capability assessment.</p>

        <h3 style={h3Style}>3. Capstone brief selection (Day 5)</h3>
        <p style={pStyle}>Capstone briefs are matched to role. A Pre-Sales PE receives a brief that requires a compelling demo and clear next-steps ask. A Post-Sales PE receives a brief that requires a working implementation and handoff documentation. An SA receives a brief that requires an adoption strategy with architecture diagrams and ROI estimates.</p>

        <h3 style={h2Style}>Handling Varying Technical Depth</h3>
        <p style={pStyle}>The cohort will include people who write code daily and people who haven’t opened a terminal in months. Three design choices address this:</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Simplify toggle:</strong> Every content page has a “Simplify” button that swaps technical language for plain-English explanations.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Contextual exercises:</strong> Steps are tagged by context (terminal, VS Code, Claude, browser). Participants comfortable in the terminal move faster.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Facilitator guide pacing notes:</strong> The facilitator guide for each module includes pacing advice for mixed-depth rooms.</p>
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
        <p style={pStyle}>Live sessions are facilitator-led and focus on demonstration, narration, and discussion — never lecture. The facilitator guide for each module includes:</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> Timed segments with narration scripts (what to say as you demo, word for word)</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> Setup checklists (repos to clone, tools to pre-install, backup plans)</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> Key moments to highlight (e.g., “When Claude self-corrects after a test failure — don’t skip this”)</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> Pacing notes for mixed-depth rooms</p>
        <p style={pStyle}>Live sessions follow the “I do, we do, you do” progression: facilitator demos first, then the group works together, then individuals tackle the lab independently.</p>

        <h3 style={h2Style}>Hands-On Labs</h3>
        <p style={pStyle}>Labs are structured as step-by-step walkthroughs embedded directly in the web application. Each step includes:</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> A description of what to do and why</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> Copy-pasteable commands (with a copy button for terminal commands)</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> Expected output so learners can self-verify</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> Tips for common pitfalls and material references</p>
        <p style={pStyle}>Labs are framed through client scenarios. Day 1’s lab isn’t “install Claude Code” — it’s “you’re onboarding Meridian Health’s backend team and delivering their first win.”</p>

        <h3 style={h2Style}>Leave-Behind Reference Materials</h3>
        <p style={pStyle}>The program includes 22 printable materials across three categories:</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Grab and Go (5 cards):</strong> Claude Code at a Glance, How Claude Code Thinks, Security Objection Handler, Claude Code vs. Competition, and Cost & ROI Pocket Math.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Module Worksheets (10 items):</strong> CLAUDE.md Builder worksheet, Prompt Patterns cheat sheet, Integration Patterns architecture reference, Demo Planning worksheet, etc.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Deep Reference (7 items):</strong> Deployment Path Finder, Enterprise Deployment talk track, Configuration & Customization reference, and others.</p>
      </div>

      {/* 4. COMPETENCY OUTCOMES */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 42, color: C.orange, lineHeight: 1, opacity: 0.25 }}>04</span>
          <h2 style={h1Style}>Competency Outcomes</h2>
        </div>
        <div style={accentLine(C.orange)} />
        <p style={pStyle}>These are what each role should be able to <em>do</em> — not just know — by the end of the program. Each outcome is tied to a specific day’s module.</p>

        {[
          { role: "PE Pre-Sales", color: C.orange, outcomes: [
            { day: "Day 1", text: "Demo Claude Code’s install and first-run experience to a prospect — narrate the agentic loop as it happens and explain why it matters vs. autocomplete." },
            { day: "Day 2", text: "Write a CLAUDE.md for a prospect’s repo during a live evaluation, showing how context transforms output quality." },
            { day: "Day 3", text: "Architect a Claude Code integration pattern for a customer evaluation — hooks for guardrails, MCP for their internal tools, slash commands for team workflows." },
            { day: "Day 4", text: "Run a full technical evaluation against a real customer use case — build a reference architecture, handle objections on security and cost, position against Copilot/Cursor/Devin, and close with a next-steps demo plan." },
            { day: "Day 5", text: "Deliver a compelling, tailored Claude Code demo from a cold customer brief in under 2 hours — including architecture proposal, live demo, and a clear next-steps ask." },
          ]},
          { role: "PE Post-Sales", color: C.blue, outcomes: [
            { day: "Day 1", text: "Set up Claude Code in a customer’s dev environment, troubleshoot common installation issues, and guide a developer through their first agentic task." },
            { day: "Day 2", text: "Pair-program with a customer engineering team to author CLAUDE.md files tailored to their codebase, conventions, and CI/CD pipeline." },
            { day: "Day 3", text: "Build and deploy custom MCP servers, hooks, and slash commands in a customer’s environment — debugging integration issues live." },
            { day: "Day 4", text: "Navigate a live customer debugging session using Claude Code — diagnose a failing integration, fix it with the customer watching, and turn the save into a relationship-building moment." },
            { day: "Day 5", text: "Scope, build, and deliver a working Claude Code implementation from a customer brief — pair-program through the hard parts, leave behind documentation, and hand off a running system." },
          ]},
          { role: "Solutions Architects", color: C.green, outcomes: [
            { day: "Day 1", text: "Articulate the agentic coding value proposition to a technical audience and map it to common customer pain points." },
            { day: "Day 2", text: "Design a CLAUDE.md strategy for a multi-team engineering org — root-level standards, team-level overrides, and integration patterns with existing style guides." },
            { day: "Day 3", text: "Design a phased Claude Code adoption plan — from individual pilot to team-wide deployment — with integration patterns for the customer’s existing toolchain." },
            { day: "Day 4", text: "Assess a customer’s engineering org, identify the highest-leverage Claude Code insertion points, position honestly against competitors, and present a strategic adoption roadmap." },
            { day: "Day 5", text: "Present a complete Claude Code adoption strategy from a blind customer brief — architecture diagrams, phased rollout, integration patterns, ROI estimates, and honest risk assessment." },
          ]},
          { role: "Applied Research", color: C.muted, outcomes: [
            { day: "Day 1", text: "Analyze Claude Code’s agentic loop behavior — tool calls, planning steps, error recovery — and identify areas where model capabilities could be extended." },
            { day: "Day 2", text: "Evaluate how CLAUDE.md content affects model reasoning quality, identify prompt patterns that improve code generation accuracy, and build evaluation harnesses." },
            { day: "Day 3", text: "Build custom tooling with the Agent SDK — automated code review pipelines, evaluation harnesses, and workflows that connect Claude Code to model training infrastructure." },
            { day: "Day 4", text: "Advise on Claude Code’s capabilities and limitations for ML/training workflows — propose custom tooling workarounds and scope what’s possible vs. what requires model-level changes." },
            { day: "Day 5", text: "Design and present a Claude Code-powered research workflow — custom Agent SDK tooling, evaluation metrics, integration with training pipelines — with a working prototype." },
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
        <p style={pStyle}>The five-day arc follows the Dreyfus model of skill acquisition: novice → advanced beginner → competent → proficient → expert.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Days 1–2 (Novice → Advanced Beginner):</strong> Learners follow rules. Install Claude Code, learn the commands, write a CLAUDE.md by template. Success is defined by following the steps correctly.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Day 3 (Competent):</strong> Learners make decisions. Which hooks to configure, which MCP servers to connect, how to compose them. Success requires judgment, not just execution.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Day 4 (Proficient):</strong> Learners handle ambiguity. Customer objections don’t follow scripts. The security conversation requires reading the room; the competitive conversation requires honest differentiation.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Day 5 (Expert):</strong> Learners integrate everything under pressure. A blind brief, a time constraint, a live audience. This is as close as we can get to the real job without being in the field.</p>
        <p style={pStyle}>This progression also follows experiential learning theory (Kolb): concrete experience → reflective observation → abstract conceptualization → active experimentation. Each module completes this cycle.</p>

        <h3 style={h2Style}>Key Trade-offs</h3>
        {[
          { title: "Shared Days 1–3 vs. earlier role divergence", text: "I chose shared sessions for the first three days despite the audience having different technical depths. The alternative — splitting into technical and non-technical tracks on Day 1 — would mean Pre-Sales PEs never build the hands-on depth needed to handle technical customer conversations. The “Simplify” toggle and facilitator pacing notes mitigate the mixed-depth challenge without sacrificing depth for anyone." },
          { title: "Client scenarios as framing vs. abstract exercises", text: "Every module is framed through a realistic client scenario (Meridian Health, Lumen Logistics, Arcadia Financial, etc.) rather than abstract exercises. This costs development time — each scenario needs a believable company, industry context, and problem statement. The payoff: learners practice the actual cognitive work of a customer engagement rather than just learning features in isolation." },
          { title: "Single-file React app vs. a more scalable architecture", text: "The application is built as a single App.jsx file. This was a deliberate choice for a portfolio piece that needs to be instantly understandable and deployable. For a production curriculum platform, I would split into components, add a proper router, and likely use a content management system for the curriculum data." },
          { title: "Depth on Day 2 (CLAUDE.md) vs. distributing across days", text: "Day 2 is the deepest module (17 steps with facilitator narration scripts). I chose to invest heavily here because the CLAUDE.md before/after demo is the single most persuasive moment in the entire program. It’s the demo every PE will run in their first customer conversation. Getting this day right has outsized impact on field readiness." },
        ].map((item, i) => (
          <div key={i} style={{ background: C.cream, borderRadius: 12, border: `1px solid ${C.lightGray}`, padding: "20px 24px", marginBottom: 16 }}>
            <h4 style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600, color: C.dark, margin: "0 0 8px" }}>{item.title}</h4>
            <p style={{ ...pStyle, margin: 0 }}>{item.text}</p>
          </div>
        ))}

        <h3 style={h2Style}>What I’d Do Differently with More Time</h3>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Video walkthroughs:</strong> Pre-recorded facilitator demos for each module, so learners can watch the “ideal” run before attempting it themselves.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Quantitative confidence measurement:</strong> Add a 1–5 confidence self-rating before and after each module.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Real MCP server for Day 3:</strong> The current lab uses a mock Jira server. With more time, I’d provision a real sandbox Jira instance.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Alumni community and feedback loop:</strong> A Slack channel or Notion database where Basecamp graduates share field reports.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Adaptive difficulty:</strong> Use the credential system to unlock advanced paths for strong performers.</p>
        <p style={bulletStyle}><span style={dot}>{"•"}</span> <strong>Localization and async delivery:</strong> Build an async-first version with video content, auto-graded exercises, and optional live office hours.</p>
      </div>
    </>
  );
}

// ─── COHORT 1 FEEDBACK CONTENT ───
function CohortFeedbackContent() {
  return (
    <>
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
              {item.implementation && (
              <div style={{ padding: "16px 20px", background: C.bg, borderRadius: 10, border: `1px solid ${C.lightGray}`, borderLeft: `3px solid ${C.orange}` }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.orange, marginBottom: 8 }}>What we changed</div>
                <div style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 500, color: C.dark, marginBottom: 4 }}>{item.implementation.label}</div>
                <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>{item.implementation.detail}</p>
              </div>
              )}
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
              <p style={st.heroBody}>A five-day structured onboarding track for GTM teams — PE Pre-Sales, PE Post-Sales, Solutions Architects, and Applied Research — building from first install to job-ready customer engagements.</p>
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
