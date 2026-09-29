// Demo mode for the Reflection Guide: scripted replies, no API call, no key.
// Each reply follows the same Question -> Export -> Exploration -> Insight arc
// the real guide is prompted with, so the demo shows the shape of the answers.

interface Script { match: RegExp; reply: string }

const SCRIPTS: Script[] = [
  { match: /twitter|tweet|\bx\b|likes?/i, reply:
`The question: what do your likes say you reach for when you're bored, stressed, or happy?
The export: Settings → Your Account → Download an archive. It arrives as JSON; likes.js is the one you want.
The exploration: sort your likes into a handful of topics, then look at them by month. When I did this, 26,720 likes turned into ten clear categories.
The insight: you're not measuring time. You're reading your own emotional diet.` },
  { match: /youtube|video|watch/i, reply:
`The question: what do you save videos for, and do you ever go back to them?
The export: takeout.google.com → YouTube → playlists and history.
The exploration: group saved titles by similar words. Clusters tend to line up with moments in your day: background noise for work, full-attention watches for downtime.
The insight: your "watch later" pile is a map of how you split your attention.` },
  { match: /linkedin|career|job|connection/i, reply:
`The question: when did you reach out to people, and what was happening in your life then?
The export: Settings → Data Privacy → Get a copy of your data. The basic export has no connection timestamps, so you may need to infer dates.
The exploration: plot connections over time and label the spikes.
The insight: career anxiety leaves a signature. It shows up as bursts of connection requests.` },
  { match: /spotify|music|song|listen/i, reply:
`The question: does your music change when you're stressed?
The export: Spotify → Account → Privacy settings → Download your data (the extended history takes longer but has every play).
The exploration: line up plays by hour and week, then mark busy weeks from your calendar.
The insight: repeat listens often cluster around hard weeks. Comfort has a playlist.` },
  { match: /netflix|show|movie|stream/i, reply:
`The question: what do you rewatch, and when?
The export: Netflix → Account → Profile → Viewing activity → Download all.
The exploration: count rewatches and note what else was going on those weeks.
The insight: rewatching is usually about comfort, not content. That's worth knowing about yourself.` },
  { match: /instagram|tiktok|reel/i, reply:
`The question: what do you save versus what do you just scroll past?
The export: Instagram → Accounts Center → Your information and permissions → Download your information (pick JSON).
The exploration: compare saved posts against liked posts. Saves are intentions; likes are reflexes.
The insight: the gap between the two is the difference between who you mean to be and how you actually spend your attention.` },
  { match: /export|download|get (my|the) data|gdpr|ccpa/i, reply:
`Almost every major platform has to give you your data. GDPR (Article 20) and the CCPA made that a legal right.
Start with one: Twitter/X (Settings → Your Account → Download an archive), Google (takeout.google.com), or LinkedIn (Settings → Data Privacy).
Expect messy files. That's normal, and cleaning them is part of the learning.` },
  { match: /screen ?time|hours|addict|too much/i, reply:
`Screen time tells you how much, never what. Four hours of friends' art and four hours of arguments feel very different.
Try swapping the question: instead of "how long was I on?", ask "what did I keep coming back to, and how did it make me feel?"
One export and an afternoon of sorting will tell you more than a week of screen-time reports.` },
];

const FALLBACK =
`Good place to start. Pick one platform you use every day and ask one feeling-shaped question about it, like "what do I reach for when I'm stressed?"
Then download that platform's data (most have an export in settings) and look at just one file.
Try asking me about Twitter, YouTube, LinkedIn, Spotify, Netflix, or Instagram to see the full path.`;

export function simulatedReply(message: string): Promise<string> {
  const hit = SCRIPTS.find(s => s.match.test(message));
  const text = hit ? hit.reply : FALLBACK;
  // A short pause so the demo feels like a conversation, not a lookup.
  return new Promise(resolve => setTimeout(() => resolve(text), 700 + Math.random() * 500));
}
