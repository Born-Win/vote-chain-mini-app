import { HttpStatus } from '@nestjs/common';

export const statusMessages: Record<number, string> = {
  /**
   * Successful responses (200–299)
   */

  /**
   * OK - The request has succeeded.
   */
  [HttpStatus.OK]: 'OK',

  /**
   * Created - The request has been fulfilled, resulting in the creation of a new resource.
   */
  [HttpStatus.CREATED]: 'Created',

  /**
   * Accepted - The request has been accepted for processing, but the processing has not been completed.
   */
  [HttpStatus.ACCEPTED]: 'Accepted',

  /**
   * Non-Authoritative Information - The request was successful but the enclosed payload has been modified by a transforming proxy from that of the origin server's 200 OK response.
   */
  [HttpStatus.NON_AUTHORITATIVE_INFORMATION]: 'Non-Authoritative Information',

  /**
   * No Content - The server successfully processed the request, but is not returning any content.
   */
  [HttpStatus.NO_CONTENT]: 'No Content',

  /**
   * Reset Content - The server successfully processed the request, but is not returning any content and requires that the requester reset the document view.
   */
  [HttpStatus.RESET_CONTENT]: 'Reset Content',

  /**
   * Partial Content - The server is delivering only part of the resource (byte serving) due to a range header sent by the client.
   */
  [HttpStatus.PARTIAL_CONTENT]: 'Partial Content',

  /**
   * Multi-Status - The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.
   */
  207: 'Multi-Status',

  /**
   * Already Reported - The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.
   */
  208: 'Already Reported',

  /**
   * IM Used - The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
   */
  226: 'IM Used',

  /**
   * Redirection messages (300–399)
   */

  /**
   * Multiple Choices - Indicates multiple options for the resource from which the client may choose.
   */
  [HttpStatus.AMBIGUOUS]: 'Multiple Choices',

  /**
   * Moved Permanently - This and all future requests should be directed to the given URI.
   */
  [HttpStatus.MOVED_PERMANENTLY]: 'Moved Permanently',

  /**
   * Found - Tells the client to look at another URL.
   */
  [HttpStatus.FOUND]: 'Found',

  /**
   * See Other - The response to the request can be found under another URI using the GET method.
   */
  [HttpStatus.SEE_OTHER]: 'See Other',

  /**
   * Not Modified - Indicates that the resource has not been modified since the version specified by the request headers.
   */
  [HttpStatus.NOT_MODIFIED]: 'Not Modified',

  /**
   * Use Proxy - The requested resource is available only through a proxy, the address for which is provided in the response.
   */
  305: 'Use Proxy',

  /**
   * Temporary Redirect - The server is currently responding to the request with a URI for a different resource.
   */
  [HttpStatus.TEMPORARY_REDIRECT]: 'Temporary Redirect',

  /**
   * Permanent Redirect - The request and all future requests should be repeated using another URI.
   */
  [HttpStatus.PERMANENT_REDIRECT]: 'Permanent Redirect',

  /**
   * Client error responses (400–499)
   */

  /**
   * Bad Request - The server cannot process the request due to a client error.
   */
  [HttpStatus.BAD_REQUEST]: 'Bad Request',

  /**
   * Unauthorized - The client must authenticate itself to get the requested response.
   */
  [HttpStatus.UNAUTHORIZED]: 'Unauthorized',

  /**
   * Payment Required - Reserved for future use.
   */
  [HttpStatus.PAYMENT_REQUIRED]: 'Payment Required',

  /**
   * Forbidden - The client does not have access rights to the content.
   */
  [HttpStatus.FORBIDDEN]: 'Forbidden',

  /**
   * Not Found - The server cannot find the requested resource.
   */
  [HttpStatus.NOT_FOUND]: 'Not Found',

  /**
   * Method Not Allowed - The request method is known by the server but is not supported by the target resource.
   */
  [HttpStatus.METHOD_NOT_ALLOWED]: 'Method Not Allowed',

  /**
   * Not Acceptable - The server cannot produce a response matching the list of acceptable values defined in the request's proactive content negotiation headers.
   */
  [HttpStatus.NOT_ACCEPTABLE]: 'Not Acceptable',

  /**
   * Proxy Authentication Required - The client must first authenticate itself with the proxy.
   */
  [HttpStatus.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy Authentication Required',

  /**
   * Request Timeout - The server would like to shut down this unused connection.
   */
  [HttpStatus.REQUEST_TIMEOUT]: 'Request Timeout',

  /**
   * Conflict - The request could not be completed due to a conflict with the current state of the target resource.
   */
  [HttpStatus.CONFLICT]: 'Conflict',

  /**
   * Gone - The content has been permanently deleted from server, with no forwarding address.
   */
  [HttpStatus.GONE]: 'Gone',

  /**
   * Length Required - The server rejects the request because the Content-Length header field is not defined and the server requires it.
   */
  [HttpStatus.LENGTH_REQUIRED]: 'Length Required',

  /**
   * Precondition Failed - The server does not meet one of the preconditions that the requester put on the request header fields.
   */
  [HttpStatus.PRECONDITION_FAILED]: 'Precondition Failed',

  /**
   * Payload Too Large - The request is larger than the server is willing or able to process.
   */
  [HttpStatus.PAYLOAD_TOO_LARGE]: 'Payload Too Large',

  /**
   * URI Too Long - The URI provided was too long for the server to process.
   */
  [HttpStatus.URI_TOO_LONG]: 'URI Too Long',

  /**
   * Unsupported Media Type - The request entity has a media type which the server or resource does not support.
   */
  [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported Media Type',

  /**
   * Range Not Satisfiable - The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
   */
  [HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE]: 'Range Not Satisfiable',

  /**
   * Expectation Failed - The server cannot meet the requirements of the Expect request-header field.
   */
  [HttpStatus.EXPECTATION_FAILED]: 'Expectation Failed',

  /**
   * I'm a teapot - Defined in 1998 as an April Fools' joke in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers.
   */
  [HttpStatus.I_AM_A_TEAPOT]: "I'm a teapot",

  /**
   * Misdirected Request - The request was directed at a server that is not able to produce a response.
   */
  [HttpStatus.MISDIRECTED]: 'Misdirected Request',

  /**
   * Unprocessable Entity - The server understands the content type of the request entity,
   * and the syntax of the request entity is correct, but it was unable to process the contained instructions.
   */
  [HttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',

  /**
   * Failed Dependency - The request failed due to failure of a previous request.
   */
  [HttpStatus.FAILED_DEPENDENCY]: 'Failed Dependency',

  /**
   * Precondition Required - The origin server requires the request to be conditional.
   */
  [HttpStatus.PRECONDITION_REQUIRED]: 'Precondition Required',

  /**
   * Too Many Requests - The user has sent too many requests in a given amount of time ("rate limiting").
   */
  [HttpStatus.TOO_MANY_REQUESTS]: 'Too Many Requests',

  /**
   * Server error responses (500–599)
   */

  /**
   * Internal Server Error - A generic error message, given when an unexpected condition
   * was encountered and no more specific message is suitable.
   */
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',

  /**
   * Not Implemented - The server either does not recognize the request method, or it lacks the ability to fulfil the request.
   */
  [HttpStatus.NOT_IMPLEMENTED]: 'Not Implemented',

  /**
   * Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server.
   */
  [HttpStatus.BAD_GATEWAY]: 'Bad Gateway',

  /**
   * Service Unavailable - The server is not ready to handle the request.
   */
  [HttpStatus.SERVICE_UNAVAILABLE]: 'Service Unavailable',

  /**
   * Gateway Timeout - The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
   */
  [HttpStatus.GATEWAY_TIMEOUT]: 'Gateway Timeout',

  /**
   * HTTP Version Not Supported - The HTTP version used in the request is not supported by the server.
   */
  [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP Version Not Supported',
};

/**
 * Fetches the message corresponding to an HTTP status code.
 * @param statusCode - The HTTP status code.
 * @returns The corresponding message or 'Unknown Status' if not found.
 */
export function getStatusMessage(statusCode: number): string {
  return statusMessages[statusCode] || 'Unknown Status';
}
