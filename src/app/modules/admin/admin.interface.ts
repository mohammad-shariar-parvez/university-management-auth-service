import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.inerface';
import { IBloodGroup, IGender } from '../../../interfaces/common';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IAdmin = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: IGender;
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: IBloodGroup;
  managementDepartment: Types.ObjectId | IManagementDepartment;
  designation: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: IGender;
  bloodGroup?: IBloodGroup;
  managementDepartment?: string;
  designation?: string;
};
