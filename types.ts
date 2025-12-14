export enum SectionType {
  INTRO = 'intro',
  INTRO_CONTENT = 'intro-content',
  DATASET = 'dataset',
  TWITTER = 'twitter',
  YOUTUBE = 'youtube',
  LINKEDIN = 'linkedin',
  INSIGHTS = 'insights',
  METHODOLOGY = 'methodology',
  TEAM = 'team',
  FRAMEWORK = 'framework',
  REFERENCES = 'references'
}

export interface InsightCardProps {
  title: string;
  technique: string;
  finding: string;
  barrier?: string;
  aiHelp?: string;
  hideMeta?: boolean;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface LinkedInEvent {
  date: string;
  connections: number;
  event?: string;
  type?: 'job' | 'school' | 'layoff';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}