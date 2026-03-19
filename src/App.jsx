import { useState } from 'react';

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
    question: "What are the biggest problems in this feedback?",
    items: [
      {
        problem: "We crammed too much into each day",
        analysis: "31% said pacing was 'too fast.' On its own, maybe that's just the less technical folks struggling. But then you look at confidence scores \u2014 dead flat across all three days (4.29, 4.28, 4.28). People aren't getting more confident as the week goes on. They wrote things like 'too much content packed into the day' and 'less content at a more reasonable pace.' When confidence doesn't budge despite three days of training, people are drowning in new material before the last batch has sunk in. The 67% who said pacing was fine? They came in with stronger technical backgrounds. The 31% are the people we're losing.",
        implementation: {
          label: "Spread it across 5 days, move lectures to pre-work",
          detail: "We went from 3 days to 5. That's ~40% less content per day. All the conceptual stuff \u2014 what is Claude Code, how does the model work, what's MCP \u2014 moved to self-paced reading people do before showing up. Live time is now 100% hands-on.",
        },
      },
      {
        problem: "Lecturing first, building second \u2014 backwards",
        analysis: "The Evals session scored 3.9 \u2014 half a point below average \u2014 and got the sharpest feedback in the whole dataset: 'too much time on abstract component taxonomy without enough concrete examples.' Same person said 'the build-along afterward was far more effective.' The interactive HTML presentation got the opposite reaction \u2014 people loved it because they could touch the tool and build while learning. The pattern is clear: when we talk at people, engagement tanks. When they build, it clicks.",
        implementation: {
          label: "Every session now starts with building, not talking",
          detail: "We killed the Evals session. Every day opens with a client problem and hands-on work. Day 1: 'Meridian Health's team takes 2-3 days per endpoint \u2014 show them how to do it in minutes.' Day 3: 'Arcadia Financial needs compliance gates \u2014 build it.' Eval concepts now live in the Applied Research track where people build working harnesses instead of reading taxonomy charts.",
        },
      },
      {
        problem: "People aren't feeling growth, and the content isn't role-specific",
        analysis: "Confidence flat. 'Apply independently' went up then back down (4.2, 4.5, 4.3). Day 3's 'realistic work simulation' score dropped to 3.9 \u2014 the most technical day felt the least connected to real work. People asked for 'more splits between SA, Engineer, Research' and 'guidance as to what is more relevant for each group.' When everyone sits through the same material regardless of their job, some of it just doesn't land.",
        implementation: {
          label: "Four role tracks with different outcomes per module",
          detail: "PE Pre-Sales, PE Post-Sales, SA, Applied Research \u2014 four tracks. Each module shows you a different outcome based on your role. A PE sees 'Demo the install to a prospect.' An SA sees 'Explain the value prop to a technical audience.' Day 4 splits into dedicated role breakouts. Skill badges give people a visible sense of progress.",
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
    signalVsNoise: "Strong signal: pacing/overload (31% + qualitative + flat confidence), Evals bombing (3.9 + specific feedback), role differentiation gap (people asked for it), setup friction (specific, fixable). Weaker signal: Day 3 realism dip (3.9, one day), async preference (one person, but a real gap worth watching). The async request is legit but isn't a systemic problem when 67% said pacing was fine. Worth a light accommodation, not a redesign.",
  },
  {
    id: "changes",
    number: "02",
    question: "What would you change for the next cohort?",
    items: [
      {
        problem: "Sessions run wall-to-wall with no gaps",
        analysis: "Day 1 goes 0-5, 5-15, 15-30, 30-40, 40-45 \u2014 no room to breathe. Put a 15-minute open block after the midpoint. Questions, troubleshooting, ad-hoc demos \u2014 whatever the room needs. Not a break. A 45-minute session becomes 60 with no new content added. Call them 'consolidation blocks' in the facilitator guide so nobody fills them with more slides.",
        implementation: {
          label: "Facilitator guides flag timing and pacing risks",
          detail: "Every segment is timed to the minute with pacing notes. Named consolidation blocks aren't in the guide yet \u2014 that's the next iteration. Adding 15 minutes of open space after the midpoint is straightforward.",
        },
      },
      {
        problem: "No way to verify setup before Day 1",
        analysis: "Everyone should pass a checklist before showing up: CLI installs, VS Code extension works, repo clones, one Claude Code command runs. If something fails, there's a 30-minute troubleshooting session the night before. Don't let Day 1 become an install debugging workshop.",
        implementation: {
          label: "Pre-work steps are in place; a hard gate is next",
          detail: "Module 1 walks through install, verify, IDE setup, and repo clone as pre-work. Facilitator checklists cover proxy and VPN fallbacks. An automated script that blocks attendance until setup passes would close the last gap.",
        },
      },
      {
        problem: "One deck for everything",
        analysis: "The best-rated element was 'the HTML presentation with live examples.' Right now one deck covers all sessions. Each day should have its own interactive deck \u2014 embedded examples people can run, 'try it' pauses, animated diagrams.",
        implementation: {
          label: "We built a Basecamp deck; per-day decks are next",
          detail: "There's a 44-slide deck covering all 5 days with speaker notes on every slide. The shared design system makes it easy to spin up per-day decks. Days 4-5 don't use slides (role-play and capstone).",
        },
      },
      {
        problem: "Day 3 ends with talking instead of building",
        analysis: "Day 3 had the lowest 'realistic work simulation' score (3.9). The last 10 minutes are an architecture discussion. Replace it: 'Arcadia's compliance team just added a rule \u2014 no API calls without an audit trail. Extend your hooks.' Keep people building right through the end when energy is lowest.",
        implementation: {
          label: "Day 3 is now the heaviest lab day, framed around a real client",
          detail: "45 min live + 75 min lab \u2014 the longest hands-on block. Framed around Arcadia Financial, a fintech with 60 engineers and hard compliance requirements.",
        },
      },
      {
        problem: "No way to measure confidence growth within a day",
        analysis: "Two-minute check at the start: 'Rate your confidence on today's skill, 1-5.' Same check at the end. Show the delta. Cross-day averages hide within-day growth.",
        implementation: {
          label: "Checkpoints and badges show qualitative growth",
          detail: "Reflection checkpoints and skill badges track progress. Adding a 1-5 rating at each checkpoint would give us the numbers.",
        },
      },
      {
        problem: "Days 1-3 don't feel relevant to every role",
        analysis: "Drop in role-specific moments at transitions: 'Pre-Sales \u2014 notice how you'd walk a prospect through this. SA \u2014 think about how this scales to 200 developers.' The content for this exists in the per-module competencies. The fix is making it a live habit for the facilitator.",
        implementation: {
          label: "Role competencies exist in the app; live callouts are next",
          detail: "Each module already has four different outcome statements by role. The app shows a personalized 'Your outcome' block. Turning these into facilitator talking points during live sessions is the remaining step.",
        },
      },
      {
        problem: "No option for people who learn better solo",
        analysis: "One person asked for an async track. Don't build a whole parallel program for that \u2014 but do two things: record every session (available within 2 hours) and offer a 30-minute daily drop-in for people who want to work through it on their own.",
        implementation: {
          label: "Pre-work and Claude Chat cover part of this",
          detail: "30-45 min of self-paced pre-work per module. A Simplify toggle for different reading speeds. Claude Chat as always-on office hours. Recordings and structured drop-ins would finish the job.",
        },
      },
    ],
  },
  {
    id: "measurement",
    number: "03",
    question: "How do you know if the changes worked?",
    items: [
      {
        problem: "Pacing \u2014 get 'Too fast' under 15% (was 31%)",
        analysis: "Ask the pacing question every day, not once at the end. 'Just right' should hit 75%+ on each day. If Day 3 still runs hot, stretch the buffer blocks on that day.",
        implementation: {
          label: "5-day format cuts daily density by ~40%",
          detail: "3 days became 5. Lectures moved to pre-work. Facilitator guides flag pacing risks segment by segment.",
        },
      },
      {
        problem: "Confidence \u2014 should climb at least +0.5 over the week",
        analysis: "4.29, 4.28, 4.28 \u2014 that flat line was the loudest signal in the data. Measure it daily, same 1-5 scale. Day 1 should be the low point, each day higher. If it plateaus after Day 3, the customer scenario and capstone days aren't building enough real confidence.",
        implementation: {
          label: "Checkpoints and badges track growth",
          detail: "Reflection checkpoints and earnable badges show progress. A before/after confidence rating at each checkpoint would give us the slope.",
        },
      },
      {
        problem: "Engagement \u2014 no session below 4.2 (Evals hit 3.9)",
        analysis: "3.9 was a clear miss. With build-first design across every session, nothing should drop that low. Measure per session, not per day. Anything under 4.0 gets the same treatment: cut the abstract framing, start with building.",
        implementation: {
          label: "No lecture-first sessions left in the program",
          detail: "Every session opens with a client problem and hands-on work. Interactive presentations replace slide decks.",
        },
      },
      {
        problem: "'Apply independently' \u2014 should end at 4.5+ (was 4.3)",
        analysis: "It went 4.2, 4.5, 4.3 \u2014 up then down. Over five days it should keep climbing. The Day 5 capstone is the real test: blind brief, no help, build and present. If that score is below 4.3, the middle days need to let go of the scaffolding sooner.",
        implementation: {
          label: "Day 5 capstone tests real independence",
          detail: "Blind customer brief, time limit, peer scoring. If someone can go from a cold brief to a working demo under pressure, they're ready.",
        },
      },
      {
        problem: "NPS \u2014 target 50+ (was 35)",
        analysis: "35 with 18% detractors means some people were unhappy. Target: 50+ with detractors under 10% and promoters over 60%. Under 45 means the core problems aren't fixed. Over 55 means we nailed it.",
        implementation: {
          label: "NPS tells us if everything else worked",
          detail: "It's the final scorecard. Fix the structural issues, NPS follows.",
        },
      },
      {
        problem: "Setup \u2014 zero live minutes on install problems",
        analysis: "Two things to track: how many people need install help during the live session (target: zero) and what percentage completed the pre-work checkpoint (target: 100%). If someone shows up without a working setup, the checkpoint process broke.",
        implementation: {
          label: "Install is pre-work now",
          detail: "CLI, IDE, and repo clone all happen before Day 1. Facilitator checklists cover the common failure modes.",
        },
      },
      {
        problem: "Role relevance \u2014 new metric, target 4.3+",
        analysis: "Add a daily question: 'Today's content was relevant to my role' (1-5). Cut by role. If SAs score lower than PEs on Days 1-3, those days need more SA-flavored moments.",
        implementation: {
          label: "Four role paths with per-module outcomes",
          detail: "Each module shows role-specific outcomes. The survey question tells us whether people feel it.",
        },
      },
    ],
    summary: "Cohort 2 works if everyone shows up Day 1 with a working install, grows more confident each day, never sits through a session below 4.2, feels the content is relevant to their job (4.3+), and walks out Day 5 telling a colleague to sign up (NPS 50+).",
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
