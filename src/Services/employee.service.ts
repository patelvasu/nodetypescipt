import Messages from '../Constants/messages';
import { Employee,IEmployee, IEmployeeLogin } from '../Models/employee.model';
import { AuthFailureError } from '../Utils/ApiError';
import TokenUtil from '../Utils/tokenUtil';
class EmployeeService {
    public async addEmployee(employee: any): Promise<any> {        
        return await Employee.create(employee);
    }
    public async getAllEmployees(): Promise<IEmployee[]> {
        return await Employee.find({},{password:0,__v:0,updatedAt:0}).exec();
    }
    public async isExistingEmail(email: string): Promise<boolean> {
        const existingEmployee = await Employee.countDocuments({ email: email }).exec();
        return existingEmployee > 0;
    }
    public async login(email: string, password: string): Promise<IEmployeeLogin> {
        // 1. Fetch the user by email
        const emp = await Employee.findOne({ email }).exec();
        if (!emp) {
          throw new AuthFailureError(Messages.Errors.INVALID_CREDENTIALS);
        }
    
        // 2. Verify the password
        const isPasswordValid =emp.validatePassword(password);        
        if (!isPasswordValid) {
          throw new AuthFailureError(Messages.Errors.INVALID_CREDENTIALS);
        }
    
        // 3. Generate a token
        const token = TokenUtil.generateToken({ id: emp._id,name:emp.name,
          email:emp.email,role:emp.role});
        await emp.updateOne({ token });
        emp.token = token;                                
        return {
          _id:`${emp._id}`,
          name:emp.name,
          email:emp.email,
          phone:emp.phone,
          department:`${emp.department}`,
          token:emp.token,
          role:emp.role
        } as IEmployeeLogin;
      }
}

export default new EmployeeService();