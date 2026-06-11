import { onMounted, ref } from 'vue';
import type { TeamMember, TeamMemberData, TeamMemberFetchedData } from './team.type';
import { assignScatter } from '@/utils/scatter';
import { $fetch } from 'ofetch';

export function useTeamMembers() {
  const members = ref<TeamMember[]>([]);
  const loading = ref<boolean>(false);
  const err = ref<Error | null>(null);

  async function fetchTeamMembers() {
    loading.value = true;
    try {
      const url = new URL(`${import.meta.env.VITE_CMS_URL}/items/homepage_team_members`);
      url.searchParams.set('filter[status][_eq]', 'published');
      url.searchParams.set('sort', 'sort');

      const { data } = await $fetch<{ data: TeamMemberFetchedData[] }>(url.toString(), {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });

      const normalized: TeamMemberData[] = data.map((m) => ({
        sort: m.sort,
        nickname: m.nickname,
        name: m.name,
        githubUsername: m.github_username,
        linkedin: m.linkedin,
        homepage: m.homepage,
        blog: m.blog,
        email: m.email,
        tags: m.tags,
      }));

      members.value = assignScatter(normalized);
    } catch (error) {
      err.value = error instanceof Error ? error : new Error(String(error));
    } finally {
      loading.value = false;
    }
  }

  onMounted(fetchTeamMembers);

  return {
    members,
    loading,
    err,
  };
}
