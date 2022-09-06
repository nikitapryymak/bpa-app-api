const {
  FASTBALL,
  CURVEBALL,
  SLIDER,
  CHANGE_UP,
} = require("../constants/AppConstants");
const {
  ENTITY_NOT_CREATED,
  ENTITY_NOT_FOUND,
} = require("../constants/AppErrorCodes");
const { AddReportSchema, validateId } = require("../schemas/schemas");
const { getPitcherById } = require("../services/player.service");
const {
  addReport,
  getPitcherReports,
  getReportById,
} = require("../services/report.service");
const { validator, tryCatch, assertCondition } = require("../utils/utils");

exports.addReportController = tryCatch(async (req, res) => {
  const { error, value: request } = validator(AddReportSchema, req.body);
  if (error) throw error;

  const [reportId] = await addReport(request);
  assertCondition(reportId, ENTITY_NOT_CREATED, "Failed to add report");

  return res.json({ reportId });
});

exports.getReportByIdController = tryCatch(async (req, res) => {
  const { error, value: reportId } = validateId(req.params.id);
  if (error) throw error;

  const [report] = await getReportById(reportId);
  assertCondition(report, ENTITY_NOT_FOUND, "Report not found");

  return res.json(report);
});

exports.getPitcherReportsController = tryCatch(async (req, res) => {
  const { id: pitcherId } = req.params;
  const { error } = validateId(pitcherId);
  if (error) throw error;

  const [pitcher] = await getPitcherById(pitcherId);
  assertCondition(pitcher, ENTITY_NOT_FOUND, "Pitcher not found");

  const reports = await getPitcherReports(pitcherId);
  const reportData = reports.reduce(
    (acc, report) => {
      const baseFields = { date: report.date, id: report.id };
      acc.fastball = [
        ...acc.fastball,
        { ...baseFields, text: report[FASTBALL] },
      ];
      acc.curveball = [
        ...acc.curveball,
        { ...baseFields, text: report[CURVEBALL] },
      ];
      acc.slider = [...acc.slider, { ...baseFields, text: report[SLIDER] }];
      acc.changeUp = [
        ...acc.changeUp,
        { ...baseFields, text: report[CHANGE_UP] },
      ];
      return acc;
    },
    { fastball: [], curveball: [], slider: [], changeUp: [] }
  );
  return res.json({ ...pitcher, ...reportData });
});
