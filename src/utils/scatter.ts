import type { TeamMember, TeamMemberData, TeamMemberScatter } from '@/features/team/team.type';

const memberScatters: TeamMemberScatter[] = [
  { x: 10, y: 10, rotate: 10 },
  { x: 120, y: -80, rotate: 25 },
  { x: -120, y: 80, rotate: -20 },
  { x: 120, y: 80, rotate: 20 },
];

export function assignScatter(members: TeamMemberData[]): TeamMember[] {
  return members.map((m, idx) => ({
    ...m,
    scatter: memberScatters[idx % memberScatters.length],
  }));
}
