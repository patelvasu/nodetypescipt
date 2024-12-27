import { Router } from 'express';
import validationMiddleware from '../middleware/validationMiddleware';
import { employeeLoginSchema, employeeSchema } from './Schemas/employeeSchema';
import employeeController from '../Controller/employeeController';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../Models/employee.model';
const employeeRoutes = Router();

employeeRoutes.get('/', employeeController.getEmployee);
employeeRoutes.post(
  '/addemployee',
  authentication,
  authorization([Role.ADMIN]),
  validationMiddleware(employeeSchema),
  employeeController.addEmployee
);
employeeRoutes.post(
  '/login',
  validationMiddleware(employeeLoginSchema),
  employeeController.login
);
employeeRoutes.get(
  '/home',
  authentication,
  authorization([Role.USER, Role.ADMIN]),
  employeeController.home
);
export default employeeRoutes;
