import ShowInfo from "./ShowInfo";
import "./Table.css";

const Table = ({ data }) => {
  const headerRow = data.slice(0, 1)[0];
  const dataRows = data.slice(1);

  const headers =
    headerRow?.map((header) => <th key={header}>{header}</th>) || [];

  const body =
    dataRows?.map((row) => {
      return (
        <tr key={`${row[0]}${row[1]}${row[2]}`}>
          {row.map((el) => {
            return <td key={el}>{el}</td>;
          })}
        </tr>
      );
    }) || [];

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>{headers}</tr>
        </thead>

        <tbody>{body}</tbody>
      </table>

      {(headers.length === 0 && dataRows.length === 0 && (
        <p>File seems to be empty</p>
      )) || <ShowInfo data={dataRows} />}
    </div>
  );
};

export default Table;
