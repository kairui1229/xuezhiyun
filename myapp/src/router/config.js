import Home from "../views/home/Home.vue"
import UserList from "../views/user-manage/UserList.vue"
import RoleList from "../views/right-manage/RoleList.vue"
import RightList from "../views/right-manage/RightList.vue"
import TagList from "../views/tag-manage/TagList.vue"
import CompanyList from "../views/interview-manage/CompanyList.vue"
import CompanyData from "../views/interview-manage/CompanyData.vue"
import StudentList from "../views/student-manage/StudentList.vue"
import GradeList from "../views/student-manage/GradeList.vue"

const routes = [
  {
    path: "/index",
    component: Home
  },
  {
    path:"/user-manage/list",
    component: UserList
  },
  {
    path:"/right-manage/rolelist",
    component: RoleList
  },
  {
    path:"/right-manage/rightlist",
    component: RightList
  },
  {
    path:"/tag-manage/list",
    component: TagList
  },
  {
    path:"/interview-manage/companylist",
    component: CompanyList
  },
  {
    path:"/interview-manage/companydata",
    component: CompanyData
  },
  {
    path:"/student-manage/studentlist",
    component: StudentList
  },
  {
    path:"/student-manage/gradelist",
    component: GradeList
  },
]
export default routes