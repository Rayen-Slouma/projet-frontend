export class RegisterDto {
    /**
     * The username of the user
     * @example 'johndoe'
     */
    username!: string;
  
    /**
     * The email address of the user
     * @example 'john.doe@example.com'
     */
    email!: string;
  
    /**
     * The user password
     * @example 'password123'
     */
    password!: string;
  }
  