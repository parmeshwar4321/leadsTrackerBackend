const leadsDataAccess = require("./leads.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");
exports.getAllLeads = async (req) => {
  const goal = await leadsDataAccess.findLeads();
  return {
    error: false,
    sucess: true,
    message: "Get leads data",
    data: goal,
  };
};
exports.getUnclaimedLeads = async (req) => {
  const goal = await leadsDataAccess.findUnclaimedLeads();
  return {
    error: false,
    sucess: true,
    message: "Get leads data",
    data: goal,
  };
};

exports.getClaimedLeadsByEmployee = async (req) => {
  const userId = req.token_data._id;
console.log(userId)
  const goal = await leadsDataAccess.findClaimedLeadsByEmployee({
    claimedUser: userId,
  });
  return {
    error: false,
    sucess: true,
    message: "Get leads data",
    data: goal,
  };
};
exports.createForm = async (req) => {
  const { email, name, interestedCourse } = req.body;
  if (!name || !email || !interestedCourse) {
    throw new ExpressError(401, "Bad request");
  }
  const data = {
    name: req.body.name,
    email: req.body.email,
    interestedCourse: req.body.interestedCourse,
  };
  const lead = await leadsDataAccess.createLeads(data);
  return {
    error: false,
    sucess: true,
    message: "Get user data",
    data: lead,
  };
};
exports.claimLead = async (req) => {
  const { leadId } = req.params;
  if (!leadId) {
    throw new ExpressError(401, "Bad request");
  }
  const userId = req.token_data._id;

  const updateData = {
    leadId,
    toUpdate: {
      isClaimed: true,
      claimedUser: userId,
    },
  };
  console.log(updateData)
  const update = await leadsDataAccess.claimLead(updateData);
  if (!update) {
    return {
      error: true,
      sucess: false,
      message: "user goal-set successfully",
    };
  }
  return {
    error: false,
    sucess: true,
    message: "claimed successfully!",
    data: update,
  };
};
