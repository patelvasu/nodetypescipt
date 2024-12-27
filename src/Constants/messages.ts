/**
 * Message constants:
 * 1. All message strings are stored in one place.
 * 2. Consistency: Ensures uniform messages across the application.
 * 3. Reusability: Messages can be reused across multiple layers like services, controllers, and middleware.
 * 4. Localization and Internationalization: 
 *      Makes it easier to implement localization by structuring messages in a centralized file.
 * 
*/
const Messages = {
    Errors: {
      ROUTE_NOT_FOUND: (route: string) => `Route not found - ${route}`,
      VALIDATION_FAILED: 'Validation failed',
      UNAUTHORIZED: 'Unauthorized access',
      ACCESS_DENIED: 'Access denied',
      FORBIDDEN: 'Forbidden',
      INTERNAL_SERVER_ERROR: 'Internal server error',
      BAD_REQUEST: 'Bad request',
      NOT_FOUND: 'Resource not found',
      SOMETHING_WENT_WRONG: 'Something went wrong',
      INVALID_CREDENTIALS:'Invalid credentials',
      INVALID_ACCESS_TOKEN:'Invalid access token',
      TOKEN_EXPIRED:'The authentication token has expired',
      AUTH_TOKEN_NOT_FOUND:'Authentication token not found in the request header. Please provide a valid token to access this resource.',
      UNAUTHRIZED_ACCESS:'Unauthorized access. User details not found',
      FORBIDDEN_ACCESS_DENIED:'Forbidden. You do not have the required permissions to access this resource',
      INVALID_JSON:'Invalid JSON payload or request syntax.',
      ALREADY_EXITS:'Already exists',
      EMAIL_EXISTS: (email: string) => `The email address "${email}" is already registered. Please use a different email.`,
      DUPLICATE_KEY: (field: string, value: string) =>
        `The ${field} is already exists with the value: ${value}.`,        
    },
    Validation:{       
        USER_NAME_REQUIRED:'User name is required.', 
        EMAIL_REQUIRED:'Email is required.',
        INVALID_EMAIL :'Invalid email address.',
        PASSWORD_MIN_LENGTH:'Password must be at least 6 characters long.',
        PASSWROD_REQUIRED:'Password is required.',
    },
    Success: {
      Done:'Done',
      LOGIN_SUCCESSFUL: 'Login successful',
      LOGOUT_SUCCESSFUL: 'Logout successful',
      REGISTER_SUCCESSFUL: 'Registration successful',
      PASSWORD_CHANGED: 'Password changed successfully',
      PASSWORD_RESET: 'Password reset successfully',
      PASSWORD_RESET_LINK_SENT: 'Password reset link sent successfully',
      PASSWORD_RESET_SUCCESSFUL: 'Password reset successful',
      USER_DELETED: 'User deleted successfully',
      USER_UPDATED: 'User updated successfully',
      USER_CREATED: 'User created successfully',
      USER_VERIFIED: 'User verified successfully',
      USER_REJECTED: 'User rejected successfully',
      USER_ACTIVATED: 'User activated successfully',
      USER_BLOCKED: 'User blocked successfully',
      USER_DEACTIVATED: 'User deactivated successfully',
      USER_UNBLOCKED: 'User unblocked successfully',
      USER_VERIFICATION_LINK_SENT: 'User verification link sent successfully',
      USER_REJECTION_LINK_SENT: 'User rejection link sent successfully',
      USER_ACTIVATION_LINK_SENT: 'User activation link sent successfully',
      USER_DEACTIVATION_LINK_SENT: 'User deactivation link sent successfully',
      USER_BLOCKING_LINK_SENT: 'User blocking link sent successfully',
      USER_UNBLOCKING_LINK_SENT: 'User unblocking link sent successfully',
      USER_VERIFICATION_SUCCESSFUL: 'User verification successful',
      USER_REJECTION_SUCCESSFUL: 'User rejection successful',
      USER_ACTIVATION_SUCCESSFUL: 'User activation successful',
      USER_DEACTIVATION_SUCCESSFUL: 'User deactivation successful',
      USER_BLOCKING_SUCCESSFUL: 'User blocking successful',
      USER_UNBLOCKING_SUCCESSFUL: 'User unblocking successful',
      PASSWORD_RESET_LINK_EXPIRED: 'Password reset link expired',
      USER_VERIFICATION_LINK_EXPIRED: 'User verification link expired',
      USER_REJECTION_LINK_EXPIRED: 'User rejection link expired',
      USER_ACTIVATION_LINK_EXPIRED: 'User activation link expired',
      USER_DEACTIVATION_LINK_EXPIRED: 'User deactivation link expired',
      USER_BLOCKING_LINK_EXPIRED: 'User blocking link expired',
      USER_UNBLOCKING_LINK_EXPIRED: 'User unblocking link expired',
      USER_NOT_FOUND: 'User not found',
      USER_ALREADY_EXISTS: 'User already exists',
      USER_NOT_VERIFIED: 'User not verified',
      USER_NOT_ACTIVE: 'User not active',
      USER_NOT_BLOCKED: 'User not blocked',
      USER_NOT_REJECTED: 'User not rejected',
      USER_GET_SUCCESSFUL: 'User get successful',            
      OPERATION_SUCCESSFUL: 'Operation successful',
      RESOURCE_CREATED: 'Resource created successfully',
      RESOURCE_UPDATED: 'Resource updated successfully',
      DEPARTMENT_CREATED: 'Department created successfully',
      DEPARTMENT_UPDATED: 'Department updated successfully',
      DEPARTMENT_DELETED: 'Department deleted successfully',
      DEPARTMENT_GET_SUCCESSFUL: 'Department get successful',      
    },
    Info: {
      SERVER_RUNNING: (port: number) => `Server is running on port ${port}`,
      DATABASE_CONNECTED: 'Database connected successfully',
    },
};



export default Messages;
  