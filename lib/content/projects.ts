// lib/content/projects.ts
import { getProjects as _getProjects } from '@/lib/sanity'
import type { Project } from './types'

export type { Project }

export async function getProjects(): Promise<Project[]> {
  try {
    return await _getProjects()
  } catch (err) {
    console.error('[content/projects] getProjects failed:', err)
    return []
  }
}
