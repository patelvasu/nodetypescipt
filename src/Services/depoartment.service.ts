import { Department } from '../Models/department.model';

class DepartmentService {
    public async getAllDepartments(): Promise<any[]> {
        return await Department.find().exec();
    }
    public async addDepartment(department: any): Promise<any> {
        return await Department.create(department);
    }
}

export default new DepartmentService();