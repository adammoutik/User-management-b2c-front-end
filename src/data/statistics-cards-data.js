import { getLastMonthUsersCount, getLastYearUsersCount, getThisYearUsersCount } from "@/services/customer.service";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";


const lastYear = await getLastYearUsersCount();
console.log(lastYear)
const thisYear = await getThisYearUsersCount();
console.log(thisYear)
const lastMonth = await getLastMonthUsersCount();

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Last Month",
    value: lastMonth[0].totalUsers,
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "This Year",
    value: thisYear[0].totalUsers,
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Last Year",
    value: lastYear[0].totalUsers,
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  
];

export default statisticsCardsData;
