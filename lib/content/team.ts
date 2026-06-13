// lib/content/team.ts
import { getTeamMembers as _getTeamMembers } from '@/lib/sanity'
import type { TeamMember } from './types'

export type { TeamMember }

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    return await _getTeamMembers()
  } catch (err) {
    console.error('[content/team] getTeamMembers failed:', err)
    return []
  }
}
