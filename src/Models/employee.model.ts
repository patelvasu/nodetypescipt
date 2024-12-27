import mongoose, { Schema, Document, Model,ObjectId } from 'mongoose';
import crypto from 'crypto';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IEmployeeLogin extends Document {
  _id:string;
  name: string;
  email: string;
  phone: string;  
  department:string;
  role:Role;
  token:string;
}
export interface IEmployee extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  token:string;
  role:Role;
  department: mongoose.Types.ObjectId;
  encryptPassword(plainPassword: string): string;
  validatePassword(plainPassword: string): boolean;
}

const EmployeeSchema: Schema<IEmployee> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      set: (email: string) => email.toLowerCase(),
    },
    phone:{
      type: String,      
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    token: {
      type:String,
      default:''
    },
    role:{
      type:String,
      default:Role.USER
    }
  },
  {
    timestamps: true,
  }
);

/**
 * Encrypt a plain text password using SHA-256
 * @param plainPassword - The password to be encrypted
 * @returns The hashed password
 */
EmployeeSchema.methods.encryptPassword = function (
  plainPassword: string
): string {
  const hash = crypto.createHash('sha256');
  hash.update(plainPassword);
  return hash.digest('hex');
};

/**
 * Validate the plain password by comparing its hash to the stored hash
 * @param plainPassword - The password to validate
 * @returns True if passwords match, otherwise false
 */
EmployeeSchema.methods.validatePassword =  function (
  plainPassword: string
): boolean {
  const encryptedPassword = this.encryptPassword(plainPassword);
  return encryptedPassword === this.password;
};

// **Middleware Hook**: Encrypt password before saving
EmployeeSchema.pre<IEmployee>('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
});

// Export Employee Model
export const Employee: Model<IEmployee> = mongoose.model<IEmployee>(
  'Employee',
  EmployeeSchema
);
