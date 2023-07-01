import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { StudentRoutes } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  // {
  //   path: '/management-departments',
  //   route: ManagementDepartmentRoutes,
  // },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  // {
  //   path: '/admins',
  //   route: AdminRoutes,
  // },
  {
    path: '/users',
    route: UserRoutes,
  },
  // {
  //   path: '/auth',
  //   route: AuthRoutes,
  // },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
