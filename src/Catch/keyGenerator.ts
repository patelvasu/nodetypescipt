// Generate Redis keys dynamically based on context
/**
 * Note: You have add Prifix here like. Alien:User:123 then set static here
 * return `Alien:${type}:${identifier}`
*/
export const generateKey =async (type: string, identifier: string): Promise<string> => {
    return `${type}:${identifier}`;
};
  
  // Example usage:
  // generateKey("user", "123") => "user:123"
  