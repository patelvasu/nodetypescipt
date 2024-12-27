import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  description: string;  
}

const DepartmentSchema: Schema<IDepartment> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },    
  },
  {
    timestamps: true,
  }
);

export const Department: Model<IDepartment> = mongoose.model<IDepartment>(
  'Department',
  DepartmentSchema
);
