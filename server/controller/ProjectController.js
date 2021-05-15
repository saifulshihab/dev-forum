import asyncHandler from 'express-async-handler';
import Project from '../models/ProjectModel.js';
import ProjectProposal from '../models/ProjectProposalModel.js';

// desc: create new freelance project by recruiter
// routes: api/project/createProject
// method: POST
export const createProject = asyncHandler(async (req, res) => {
  const newProject = await Project.create({ user: req.user?._id, ...req.body });
  if (newProject) {
    res.status(201).json(newProject);
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
      res.status(200).json(project);
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
// desc: Get freelance projects by developer
// routes: api/project/getFreelanceProjects
// method: GET
export const getFreelanceProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: '-1' });
  if (projects) {
    res.status(200).json(projects);
  } else {
    res.status(404);
    throw new Error('Projects not found!');
  }
});
// desc: Developer send project proposal
// routes: api/project/sendProjectProposal/:projectId
// method: POST
export const sendProjectProposal = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (project) {
    const alreadySent = await ProjectProposal.find({
      user: req.user._id,
      project: project._id,
    });
    if (!alreadySent) {
      const newProposal = await ProjectProposal.create({
        user: req.user?._id,
        project: project?._id,
        ...req.body,
      });
      if (newProposal) {
        res.status(201).json(newProposal);
      } else {
        res.status(500);
        throw new Error('Failed to send proposal!');
      }
    } else {
      res.status(403);
      throw new Error('You already sent a proposal for this project!');
    }
  } else {
    res.status(404);
    throw new Error('Project not found!');
  }
});
// desc: Edit project proposal
// routes: api/project/deleteProjectProposal/:proposalId
// method: DELETE
export const deleteProjectProposal = asyncHandler(async (req, res) => {
  const proposal = await ProjectProposal.findById(req.params.proposalId);
  if (proposal) {
    if (proposal.user.toString() === req.user._id.toString()) {
      await proposal.remove();
      res.status(200).json(proposal);
    } else {
      res.status(403);
      throw new Error('You are not authorized to delete this proposal!');
    }
  } else {
    res.status(404);
    throw new Error('Proposal not found!');
  }
});
// desc: Get project proposals
// routes: api/project/getProjectProposals/:projectId
// method: GET
export const getProjectProposals = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (project) {
    if (project.user.toString() === req.user._id.toString()) {
      const proposals = await ProjectProposal.find({
        project: project?._id,
      }).populate('user');
      if (proposals) {
        res.status(200).json(proposals);
      } else {
        res.status(404);
        throw new Error('No proposals!');
      }
    } else {
      res.status(403);
      throw new Error('You are not authorixed to dot this!');
    }
  } else {
    res.status(404);
    throw new Error('Project not found!');
  }
});
