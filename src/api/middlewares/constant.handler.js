export const statusCodes = {
    OK_200: 200,
    CREATED_201: 201,
    ACCEPTED_202: 202,
    NO_CONTENT_204: 204,
    NOT_MODIFIED_304: 304,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    FORBIDDEN_403: 403,
    NOT_FOUND_404: 404,
    METHOD_NOT_ALLOWED_405: 405,
    REQUEST_TIME_OUT_408: 408,
    ALREADY_EXISTS_409: 409,
    PAYLOAD_TOO_LARGE_413: 413,
    ALREADY_EXISTS_422: 422,
    TOO_MANY_REQUETS_429: 429,
    UNAVAILABLE_FOR_LEGAL_REASON_451: 451,
    INTERNAL_SERVER_ERROR_500: 500,
    NOT_IMPLEMENTED_501: 501,
    SERVICE_INVALID_RESPONSE_502: 502,
    SERVICE_UNAVAILABLE_503: 503 
}

export const errorMessages = {
	RESOURCE_NOT_FOUND : {
		message : 'Something went wrong. Please try again in sometime.'
	},
	INTERNAL_SERVER_ERROR : {
		message : 'Internal server error. An error occurred on the server while processing the request.'
	},
	SERVICE_INVALID_RESPONSE : {
		message : 'Something went wrong. Please try again in sometime.'
	},
	UNAUTHORIZED : {
		message : 'Unauthorized request.'
	},
	INVALID_API_KEY : {
		message : 'Unauthorized: Invalid \'x-api-key\''
	},
	MISSING_API_KEY : {
		message : 'Unauthorized: \'x-api-key\' header required'
	},
	INVALID_ACCESS_TOKEN : {
		message : 'Unauthorized: Invalid \'x-access-token\''
	},
	MISSING_ACCESS_TOKEN : {
		message : 'Unauthorized: \'x-access-token\' header required'
	},
	EXPIRED_ACCESS_TOKEN : {
		message : 'Unauthorized: \'x-access-token\' is expired'
	},
	INVALID_REFRESH_TOKEN : {
		message : 'Unauthorized: Invalid \'x-refresh-token\''
	},
	MISSING_REFRESH_TOKEN : {
		message : 'Unauthorized: \'x-refresh-token\' header required'
	},
	EXPIRED_REFRESH_TOKEN : {
		message : 'Unauthorized: \'x-refresh-token\' is expired'
	},
	MISSING_GROUP_ID : {
		message : 'Unauthorized: \'x-group-id\' header required'
	},
	INVALID_GROUP_ID : {
		message : 'Unauthorized: \'x-group-id\' is invalid'
	},
	INVALID_REQUEST : {
		message : 'Something went wrong. Please try again in sometime.'
	},
	INVALID_INPUT : {
		message : 'Something went wrong. Please try again in sometime.'
	},
	INVALID_CREDENTIALS : {
		message : 'Not the Valid credentials'
	},
	ACCOUNT_DELETED : {
		message : 'Account is deleted.'
	},
	ACCOUNT_REJECTED : {
		message : 'Account is rejected or blocked.'
	},
	ACCOUNT_NOT_APPROVED : {
		message : 'Your account is not approved!'
	},
	ACCOUNT_NOT_VERIFIED : {
		message : 'Your account is not verified!'
	},
	ACCOUNT_NOT_ACTIVE : {
		message : 'Account is not active'
	},
	DETAILS_NOT_FOUND : {
		message : 'Oh! Details not available.'
	},
	EMAIL_ALREADY_EXIST : {
		message : 'Email Id already exist.'
	},
	EMAIL_ALREADY_VERIFIED : {
		message : 'Email Id already verified.'
	},
	PHONE_NUMBER_ALREADY_EXIST : {
		message : 'Phone Number already exist.'
	},
	ALREADY_EXIST : {
		message : 'Oh! Details already exist.'
	},
	EMAIL_NOT_FOUND : {
		message : 'Email-id not available'
	},
	USER_NOT_FOUND : {
		message : 'User details not available'
	},
	INVALID_EXPIRED_VERIFICATION_CODE : {
		message : 'Verification code is invalid or has expired.'
	},
	INVALID_VERIFICATION_CODE : {
		message : 'Invalid verification code.'
	},
	VERIFICATION_CODE_EXPIRED : {
		message : 'Verification code expired'
	},
	VERIFICATION_CODE_ALREADY_USED : {
		message : 'Verification code already used'
	},
	OLD_PASSWORD_NOT_MATCH : {
		message : 'Old Password not mateched!'
	},
	SUPER_ADMIN_ALREADY_EXIST : {
		message : 'Super Admin account already exist'
	},
	INVALID_CHECKSUM : {
		message : 'Invalid Checksum!'
	},
	USERNAME_ALREADY_EXISTS : {
		message : 'Username is already used'
	},
};

export const Roles = {
	ADMIN : 'ADMIN',
	INSTRUCTOR : 'INSTRUCTOR',
	STUDENT : 'STUDENT'
}
