import asyncHandler from 'express-async-handler';
import Project from '../models/ProjectModel.js';

// desc: create new freelance project by recruiter
// routes: api/project/createProject
// method: POST
export const createProject = asyncHandler(async (req, res) => {
  const newProject = await Project.create({ user: req.user?._id, ...req.body });
  if (newProject) {
    res.status(200).json(newProject);
  } else {
    res.status(500);
    throw new Error('Failed to post project!');
  }
});
// desc: edit freelance project by recruiter
// routes: api/project/:projectId
// method: PUT
export const editProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (project) {
    if (project?.user?.toString() === req.user?._id.toString()) {
      const update = await Project.findOneAndUpdate(
        { _id: req.params.projectId },
        { $set: req.body },
        { new: true }
      );
      if (update) {
        res.status(200).json(update);
      } else {
        res.status(500);
        throw new Error('Failed to update project!');
      }
    } else {
      res.status(403);
      throw new Error('You are not authorized to edit this!');
    }
  } else {
    res.status(404);
    throw new Error('Project not found!');
  }
});
// desc: Delete freelance project by recruiter
// routes: api/project/:projectId
// method: DELETE
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (project) {
    if (project?.user?.toString() === req.user?._id.toString()) {
      await project.remove();
      res.status(200).json({ message: 'Project deleted!' });
    } else {
      res.status(403);
      throw new Error('You are not authorized to delete this!');
    }
  } else {
    res.status(404);
    throw new Error('Project not found!');
  }
});
// desc: Get recruiter projects
// routes: api/project/getRecruiterProjects
// method: GET
export const getRecruiterProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user?._id }).sort({
    createdAt: '-1',
  });
  if (projects) {
    res.status(200).json(projects);
  } else {
    res.status(404);
    throw new Error('Projects not found!');
  }
});
