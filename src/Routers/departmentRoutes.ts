import { Router } from 'express';
import departmentController from '../Controller/departmentController';
import authorization from '../middleware/authorization';
import { Role } from '../Models/employee.model';
import authentication from '../middleware/authentication';
const departmentRoutes = Router();
departmentRoutes.get('/', departmentController.getDeartment);
departmentRoutes.post(
  '/add',
  authentication,
  authorization([Role.ADMIN]),
  departmentController.addDepartment
);

export default departmentRoutes;
