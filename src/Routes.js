import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import AdminRoutes from "./auth/AdminRoutes";
import InstituteAdminDashboard from './Institute/InstituteDashboard';
import TeacherRoutes from "./auth/TeacherRoutes";
import StudentRoutes from "./auth/StudentRoutes";
import AdminDashboard from "./admin/AdminDashboard";
import Institute from "./admin/InstituteDashboard/InstituteDashboard";
import InstituteInfo from './admin/InstituteDashboard/Instituteinfo';
import Teacher from "./admin/TeacherDashboard/TeacherDashboard";
import Student from "./admin/StudentDashboard/StudentDashboard";
import Amount from './admin/AmountDashboard/AmountDashboard';
import InstituteUser from './Institute/UserDashboard/UserDashboard';
import InstituteContent from './Institute/ContentDashboard/ContentDashboard';
import InstituteContentInfo from './Institute/ContentDashboard/ContentInfo';
import InstitutePlanner from './Institute/PlannerDashboard/PlannerDashboard';
import InstitutePlannerInfo from './Institute/PlannerDashboard/PlannerInfo';
import InstituteBatch from './Institute/BatchDashboard/BatchDashboard';
import InstituteBatchInfo from './Institute/BatchDashboard/Batchinfo';
import InstituteCalender from './Institute/CalenderDashboard/CalenderDashbaord';
import InstituteBatchEvent from './Institute/CalenderDashboard/Eventinfo';
import InstituteBilling from './Institute/BillingDashboard/BillingDashboard';
import InstituteMoreDashboard from './Institute/More/MoreDashboard';
import InstitutePostponed from './Institute/More/Pending';
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentDashboard from "./student/StudentDashboard";
import ContentDashboard from "./teacher/ContentDashboard/ContentDashboard";
import PlannerDashboard from "./teacher/PlannerDashboard/PlannerDashboard";
import BatchDashboard from "./teacher/BatchDashboard/BatchDashboard";
import UserDashboard from "./teacher/UserDashboard/UserDashboard";
import ContentInfo from "./teacher/ContentDashboard/ContentInfo";
import Calender from "./teacher/CalenderDashboard/CalenderDashbaord";
import Billing from "./teacher/BillingDashboard/BillingDashboard";
import PlannerInfo from "./teacher/PlannerDashboard/PlannerInfo";
import BatchInfo from "./teacher/BatchDashboard/Batchinfo";
import BatchStudents from './teacher/BatchDashboard/Students';
import BatchTeachers from "./teacher/BatchDashboard/Teachers";
import BatchAttendance from "./teacher/BatchDashboard/Attendance";
import BatchHomework from './teacher/BatchDashboard/Homework';
import StudentCalender from './student/CalenderDashboad/CalenderDashbaord';
import StudentHomework from './student/HomeworkDashboard/HomeworkDashboard';
import StudentExam from './student/ExamDashboard/ExamDashboard';
import StudentAttendance from './student/AttendanceDashboard/AttendanceDashboard';
import StudentBilling from './student/BillingDashboard/BillingDashboard';
import InstituteRoutes from './auth/InstituteRoutes';
import EventInfo from './teacher/CalenderDashboard/EventInfo';
import TeacherMore from './teacher/More/MoreDashboard';
import PendingClass from './teacher/More/Pending';



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard}/>
                <InstituteRoutes path="/institute/admin/dashboard" exact component={InstituteAdminDashboard}/>
                <TeacherRoutes path="/teacher/dashboard" exact component={TeacherDashboard}/>
                <StudentRoutes path="/student/dashboard" exact component={StudentDashboard}/>


                <AdminRoutes path="/admin/teacher" exact component={Teacher}/>
                <AdminRoutes path="/admin/student" exact component={Student}/>
                <AdminRoutes path="/admin/institute" exact component={Institute}/>
                <AdminRoutes path="/admin/amount" exact component={Amount}/>
                <AdminRoutes path="/admin/institute-info/:instituteId" component={InstituteInfo}/>


                <InstituteRoutes path="/institute/admin/dashboard" exact component={InstituteAdminDashboard}/>
                <InstituteRoutes path="/institute/admin/users" exact component={InstituteUser}/>
                <InstituteRoutes path="/institute/admin/content" exact component={InstituteContent}/>
                <InstituteRoutes path="/institute/admin/content/:contentId" exact component={InstituteContentInfo}/>
                <InstituteRoutes path="/institute/admin/planner" exact component={InstitutePlanner}/>
                <InstituteRoutes path="/institute/admin/planner/:plannerId" exact component={InstitutePlannerInfo}/>
                <InstituteRoutes path="/institute/admin/batch" exact component={InstituteBatch}/>
                <InstituteRoutes path="/institute/admin/batch/:batchId" exact component={InstituteBatchInfo}/>
                <InstituteRoutes path="/institute/admin/calender" exact component={InstituteCalender}/>
                <InstituteRoutes path="/institute/admin/calender/event/:batchId/:contentId/:eventId" exact component={InstituteBatchEvent}/>
                <InstituteRoutes path="/institute/admin/billing" exact component={InstituteBilling}/>
                <InstituteRoutes path="/institute/admin/more" exact component={InstituteMoreDashboard}/>
                <InstituteRoutes path="/institute/admin/more/postponed" exact component={InstitutePostponed}/>


                <TeacherRoutes path="/teacher/content" exact component={ContentDashboard}/>
                <TeacherRoutes path="/teacher/planner" exact component={PlannerDashboard}/>
                <TeacherRoutes path="/teacher/batch" exact component={BatchDashboard}/>
                <TeacherRoutes path="/teacher/users" exact component={UserDashboard}/>
                <TeacherRoutes path="/teacher/content/:contentId" exact component={ContentInfo}/>
                <TeacherRoutes path="/teacher/billing" exact component={Billing}/>
                <TeacherRoutes path="/teacher/planner/:plannerId" exact component={PlannerInfo}/>
                <TeacherRoutes path="/teacher/batch/students" exact component={BatchStudents}/>
                <TeacherRoutes path="/teacher/batch/attendance" exact component={BatchAttendance}/>
                <TeacherRoutes path="/teacher/batch/attendance" exact component={BatchTeachers}/>
                <TeacherRoutes path="/teacher/batch/attendance" exact component={BatchHomework}/>
                <TeacherRoutes path="/teacher/batch/:batchId" exact component={BatchInfo}/>
                <TeacherRoutes path="/teacher/calender/event/:batchId/:contentId/:eventId" exact component={EventInfo}/>
                <TeacherRoutes path="/teacher/calender" exact component={Calender}/>
                <TeacherRoutes path="/teacher/more" exact component={TeacherMore}/>
                <TeacherRoutes path="/teacher/more/pending" exact component={PendingClass}/>


                <StudentRoutes path="/student/calender" exact component={StudentCalender}/>
                <StudentRoutes path="/student/homework" exact component={StudentHomework}/>
                <StudentRoutes path="/student/exam" exact component={StudentExam}/>
                <StudentRoutes path="/student/attendance" exact component={StudentAttendance}/>
                <StudentRoutes path="/student/billing" exact component={StudentBilling}/>

            </Switch>
        </BrowserRouter>
    )
};

export default Routes;

