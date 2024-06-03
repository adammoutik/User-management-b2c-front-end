import { chartsConfig } from "@/configs";
import { getByType, getPast12MonthsCustomers } from "@/services/customer.service";

const past12customers = await getPast12MonthsCustomers();
const usersCount = []
const monthsyears = []
past12customers.map((item) => {usersCount.unshift(item.totalUsers);monthsyears.unshift(`${item.month}-${item.year}`)})

const bytype = await getByType();
console.log("bytype :",bytype);

const types = []
const typesCount = []

bytype.filter((item) => item._id != null).map((item) => {types.unshift(item._id);typesCount.unshift(item.totalUsers)})


const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: typesCount,
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: types,
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Users",
      data: usersCount,
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: monthsyears,
    },
  },
};

const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories:types,
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Tasks",
      data: typesCount,
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Daily Signups",
    description: "",
    footer: "Updated 20 minutes ago",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Monthly signups",
    description: "",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Completed Tasks",
    description: "",
    footer: "just updated",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
