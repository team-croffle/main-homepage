export interface TeamMemberData {
  nickname: string;
  name: string;
  githubUsername: string;
  linkedin?: string;
  homepage?: string;
  blog?: string;
  email: string;
  tags: string[];
  sort: number;
}

export interface TeamMemberFetchedData extends Omit<TeamMemberData, 'githubUsername'> {
  id: string;
  github_username: string;
}

export interface TeamMemberScatter {
  x: number;
  y: number;
  rotate: number;
}

export interface TeamMember extends TeamMemberData {
  scatter: TeamMemberScatter;
}
