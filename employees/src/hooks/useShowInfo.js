export const useShowInfo = (data) => {
  // employeeData === {empId, projectId, dateFrom, dateTo}

  /* 
    separetedOnProjects === 
    {
        projectId : [employeeData, employeeData ...],
        projectId : [employeeData, employeeData ...]
    } 
    */
  const employees = data.map((row) => ({
    empId: row[0],
    projectId: row[1],
    dateFrom: row[2],
    dateTo: row[3],
  }));

  const separetedOnProjectsEmployees = employees.reduce((acc, emp) => {
    if (acc.hasOwnProperty(emp.projectId)) {
      acc[emp.projectId].push(emp);
    } else {
      acc[emp.projectId] = [emp];
    }
    return acc;
  }, {});

  const commonDays = calculateCommonDays(separetedOnProjectsEmployees);
  const maxPairResult = findMaxCommonDays(commonDays);

  const [emp1Id, emp2Id] = Object.keys(maxPairResult)[0].split(",");

  return [
    emp1Id,
    emp2Id,
    maxPairResult[`${emp1Id},${emp2Id}`]?.totalCommonDays,
    maxPairResult[`${emp1Id},${emp2Id}`]?.commonProjects,
  ];
};

const calculateCommonDays = (data) => {
  const commonDays = {};

  for (let [projectId, employees] of Object.entries(data)) {
    for (let i = 0; i < employees.length - 1; i++) {
      for (let j = 1; j < employees.length; j++) {
        compareDates(employees[i], employees[j], commonDays, projectId);
      }
    }
  }

  return commonDays;
};

const compareDates = (emp1, emp2, commonDays, projectId) => {
  // employeeData === {emplId, projectId, dateFrom, dateTo}
  const millisecondsInADay = 86_400_000;

  const dateArr = [
    {
      empId: emp1.empId,
      date: new Date(emp1.dateFrom).getTime() || new Date().getTime(),
    },
    {
      empId: emp1.empId,
      date: new Date(emp1.dateTo).getTime() || new Date().getTime(),
    },
    {
      empId: emp2.empId,
      date: new Date(emp2.dateFrom).getTime() || new Date().getTime(),
    },
    {
      empId: emp2.empId,
      date: new Date(emp2.dateTo).getTime() || new Date().getTime(),
    },
  ];

  dateArr.sort((a, b) => a.date - b.date);

  if (dateArr[0].empId === dateArr[1].empId) {
    return;
  }

  const diffMilliseconds = dateArr[2].date - dateArr[1].date;
  const days = Math.floor(diffMilliseconds / millisecondsInADay);

  /*
  commonDays =
  {
    "empId1,empId2" : {
      commonProjects: [{projectId, days}, {projectId, days}...],
      totalCommonDays: number
    }
    ...
  }
  */
  if (commonDays[`${emp1.empId},${emp2.empId}`]) {
    commonDays[`${emp1.empId},${emp2.empId}`].commonProjects.push({
      projectId,
      days,
    });
    commonDays[`${emp1.empId},${emp2.empId}`].totalCommonDays += days;
  } else if (commonDays[`${emp2.empId},${emp1.empId}`]) {
    commonDays[`${emp2.empId},${emp1.empId}`].commonProjects.push({
      projectId,
      days,
    });
    commonDays[`${emp2.empId},${emp1.empId}`].totalCommonDays += days;
  } else {
    commonDays[`${emp1.empId},${emp2.empId}`] = {
      commonProjects: [{ projectId, days }],
      totalCommonDays: days,
    };
  }
};

const findMaxCommonDays = (commonDays) => {
  let maxPair = null;
  let maxTotalCommonDays = 0;

  // Loop over each key-value pair and find the pair with the maximum totalCommonDays
  for (const [pair, commonDaysData] of Object.entries(commonDays)) {
    if (commonDaysData.totalCommonDays > maxTotalCommonDays) {
      maxPair = pair;
      maxTotalCommonDays = commonDaysData.totalCommonDays;
    }
  }

  return {
    [maxPair]: {
      commonProjects: commonDays[maxPair]?.commonProjects,
      totalCommonDays: maxTotalCommonDays,
    },
  };
};
