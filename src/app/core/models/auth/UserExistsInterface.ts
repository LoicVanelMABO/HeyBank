// Interface to check if a user exists based on client code
export interface UserExistsRequest {
    clientCode: string;
}

// Interface representing the response for user existence check
export interface UserExistsResponse {
    exists: boolean;
}