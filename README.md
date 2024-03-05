# Fillout's test application

## Description

This project is a simple Express server that provides an API for fetching filtered responses provided by Fillout's API. 
We used Express (to run Node.js), Axios (to make API calls), and dotenv (to get environment variables).

PS: It was asked for the endpoint to be just "/{formId}/filteredResponses" but I decided to add a 'forms" path.
Since this project only has one endpoint, doing it all on the main path is not a good practice.

## API Endpoint

### GET /forms/:formId/filteredResponses

Fetches filtered responses from a specific form.

#### Parameters
#### URL parameters:
- formId (required) - the public identifier of the form for which you want to retrieve responses. This should be a string.

#### Query parameters:
- limit(optional) - the maximum number of responses to retrieve per request. Must be a number between 1 and 150. Default is 150.
- afterDate (optional) - a date string to filter responses submitted after this date
- beforeDate (optional) - a date string to filter responses submitted before this date
- offset(optional) - the starting position from which to fetch the responses. Default is 0.
- status(optional) - pass in_progress to get a list of in-progress (unfinished) submissions. By default, only finished submissions are returned.
- includeEditLink (optional) - pass true to include a link to edit the submission as editLink
- sort (optional) - can be asc or desc, defaults to asc
- filters (optional) - a stringified JSON representing the filters to apply. Each filter is an object with the following properties:
  - id (required) - filter's id.
  - condition (required) - condition to be applied. It can be "equals", "does_not_equal", "greater_than" or "less_than".
  - value (required) - the value to be compared, can be a string or a number.
