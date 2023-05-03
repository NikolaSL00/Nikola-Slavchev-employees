import "./ShowInfo.css";

import { useShowInfo } from "../../../hooks/useShowInfo";

const ShowInfo = ({ data }) => {
  const [emp1Id, emp2Id, totalCommonDays, commonProjects] = useShowInfo(data);

  const isNumber = isFinite(totalCommonDays);

  const content = isNumber && (
    <div className="content-container">
      <table>
        <thead>
          <tr>
            <th>Employee ID #1</th>
            <th>Employee ID #2</th>
            <th>Project ID</th>
            <th>Days Worked</th>
          </tr>
        </thead>
        <tbody>
          {commonProjects.map((projectData) => {
            return (
              <tr key={`${projectData.projectId},${emp1Id},${emp2Id}`}>
                <td>{emp1Id}</td>
                <td>{emp2Id}</td>
                <td>{projectData.projectId}</td>
                <td>{projectData.days}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p>
        Employee with id {emp1Id} and employee with id {emp2Id} has spend{" "}
        {totalCommonDays} days on common projects together, which is record for
        our company
      </p>
    </div>
  );

  return (
    <div className="show-info-container">
      {(isNumber && content) || (
        <p>
          There aren't any employees who worked on same projects at the same
          time
        </p>
      )}
    </div>
  );
};

export default ShowInfo;
