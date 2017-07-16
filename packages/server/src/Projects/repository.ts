import { Project, createProject, validateProject } from '../models/Project'

export function getProject(id: string): Promise<Project> {
    return new Promise(resolve => resolve(createProject('any name', 'desc')))
}

export function saveProject(project: Project): Promise<Project> {
    return new Promise((resolve, reject) => {
        let savedProj
        try {
            savedProj = validateProject(project)
        } catch (e) {
            return reject(e)
        }
        resolve(savedProj)
    })
}