import { Context, APIGatewayProxyEvent } from "aws-lambda";
import DynamoDBService from "./dynamo_service";

interface HTTPResponse {
  statusCode: number;
  body: string;
  headers: any;
}

// Handler for GET offers lambda
const listOffers = async (event: APIGatewayProxyEvent, context: Context) => {
  const response: HTTPResponse = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(DynamoDBService.getAllVisibleOffers())
  };
  return response;
};

// Handler for GET offers/{id} lambda
const offerDetails = async (event: APIGatewayProxyEvent, context: Context) => {
  // Check if id is present in request
  if (!event.pathParameters || !event.pathParameters.id) {
    return getErrorResponse(400, "No offer id provided in the path");
  }

  // Check if there is such an id in dynamo db
  let offer = DynamoDBService.getOffer(event.pathParameters.id);
  if (!offer) {
    return getErrorResponse(404, "Offer not found");
  }

  // Fetch offer and return details
  const response: HTTPResponse = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(offer)
  };
  return response;
};

// Constructs an error response given HTTP status and an error message
const getErrorResponse = (statusCode: number, errorMessage: string) => {
  const response: HTTPResponse = {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      message: errorMessage
    })
  };
  return response;
};

export { listOffers, offerDetails };
