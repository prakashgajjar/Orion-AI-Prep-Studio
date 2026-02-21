/**
 * Standardized API Response Handler
 */

export const successResponse = (data, message = "Success", statusCode = 200) => {
  return new Response(
    JSON.stringify({
      success: true,
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString(),
    }),
    {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const errorResponse = (message = "Error", statusCode = 400, error = null) => {
  return new Response(
    JSON.stringify({
      success: false,
      statusCode,
      message,
      error: error?.message || error,
      timestamp: new Date().toISOString(),
    }),
    {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const validationError = (errors) => {
  return new Response(
    JSON.stringify({
      success: false,
      statusCode: 422,
      message: "Validation failed",
      errors,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 422,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const unauthorizedResponse = () => {
  return new Response(
    JSON.stringify({
      success: false,
      statusCode: 401,
      message: "Unauthorized - Authentication required",
      timestamp: new Date().toISOString(),
    }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );
};
