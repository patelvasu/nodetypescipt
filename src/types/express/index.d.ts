import express from 'express';
import { Role } from '../../Models/employee.model';

interface IUser{
  id:string;
  name:string;
  email:string;
  role:Role;
}
declare global {
  namespace Express {
    interface Request {
      user:IUser 
    }
  }
}