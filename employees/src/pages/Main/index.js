import { useState } from "react";

import Header from "../../components/Header";
import Form from "../../components/Form";
import Table from "../../components/Table";

const MainPage = () => {
  const [data, setData] = useState(null);

  return (
    <>
      <Header />
      <Form setData={(data) => setData(data)} />
      {data && <Table data={data} />}
    </>
  );
};

export default MainPage;
