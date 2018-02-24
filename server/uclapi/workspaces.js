const { WORKSPACE_IMAGE_URL } = require("./constants");
const JSONRequest = require("./JSONRequest");
const surveys = require("./surveysList");

const getWorkspaces = () =>
  surveys.surveys.map(survey => ({ name: survey.name, id: survey.id }));

const getImage = (token, imageId) =>
  JSONRequest(
    `${WORKSPACE_IMAGE_URL}?token=${token}&image_id=${
      imageId
    }&image_format=raw`,
  );

module.exports = {
  getWorkspaces,
  getImage,
};
