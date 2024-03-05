import { Request, Response } from "express";
import { getAllSubmissions } from "../services/forms";
import {
  FilterClauseType,
  Submission,
  SubmissionsParams,
} from "../utils/types";
import { Conditions, ValueTypes } from "../utils/constants";

export const getFilteredResponses = async (req: Request, res: Response) => {
  try {
    const query: SubmissionsParams = req.query;
    const formId: string = req.params.id;

    /**
     * We remove limit from the query object because, to control pagination on the new endpoint,
     * we have to get all possible submissions, filter them, and then paginate the results.
     * We also remove filters, even though it's not necessary, but it's a good practice
     */
    const filters: FilterClauseType[] = query.filters
      ? JSON.parse(query.filters)
      : null;
    const limit = query.limit || 1;
    delete query.filters;
    delete query.limit;

    const submissions = await getAllSubmissions(formId, query);
    if (!submissions) {
      res.status(422);
      res.send("Invalid parameters");
      return;
    }
    if (!filters) {
      res.send({
        responses: submissions,
        totalResponses: submissions.length,
        pageCount: Math.ceil(submissions.length / limit),
      });
      return;
    }

    const filteredSubmissions = submissions.filter((submission: Submission) => {
      let shouldInclude = true;

      for (let question of submission.questions) {
        const filter = filters.find((filter) => filter.id === question.id);

        if (!filter) continue;

        let filterValue =
          question.type === ValueTypes.datePicker
            ? new Date(filter.value)
            : question.type === ValueTypes.numberInput
            ? Number(filter.value)
            : filter.value;
        let questionValue =
          question.type === ValueTypes.datePicker
            ? new Date(question.value)
            : question.type === ValueTypes.numberInput
            ? Number(question.value)
            : question.value;

        switch (filter.condition) {
          case Conditions.equals:
            if (questionValue !== filterValue) {
              shouldInclude = false;
            }
            break;
          case Conditions.doesNotEqual:
            if (questionValue === filterValue) {
              shouldInclude = false;
            }
            break;
          case Conditions.greaterThan:
            if (filterValue < questionValue) {
              shouldInclude = false;
            }
            break;
          case Conditions.lessThan:
            if (filterValue > questionValue) {
              shouldInclude = false;
            }
            break;
        }

        if (!shouldInclude) break;
      }

      return shouldInclude;
    });

    res.send({
      responses: filteredSubmissions,
      totalResponses: filteredSubmissions.length,
      pageCount: Math.ceil(filteredSubmissions.length / limit),
    });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
