import { React, useEffect, useState } from "react";

const App = () => {
  const [name, setname] = useState("");
  const [datetime, setdatetime] = useState("");
  const [discription, setdiscription] = useState("");
  const [transaction, settransaction] = useState([]);



  useEffect(() => {
    getTransaction().then(settransaction);
  }, [transaction]);

  const getTransaction = async () => {
    const url = `${windows.location.origin}/api/transaction`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const url = `${windows.location.origin}/api/transaction`;
    const price = name.split(" ")[0];
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        datetime,
        discription,
      }),
    }).then((response) => {
      response.json().then((data) => {
        setname("")
        setdiscription("")
        setdatetime("")
        return data;
      });
    });
  };
 let balance=0
 for (const iterator of transaction) {
  balance= balance+Number(iterator.price)
 }
  return (
    <main>
      <h1>
        $ {balance}
      </h1>
      <form onSubmit={HandleSubmit}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder={`+ 200 new samsung tv`}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setdatetime(e.target.value)}
          />
        </div>
        <div className="discription">
          <input
            type="text"
            value={discription}
            onChange={(e) => setdiscription(e.target.value)}
            placeholder={`description`}
          />
        </div>
        <button type="submit"> add new transation</button>
      </form>
      {transaction.length > 0 &&
        transaction.map((data, id) => {
          return (
            <div key={id}>
              <div className="transactions" >
                <div className="transaction">
                  <div className="left">
                    <div className="name">{data.name}</div>
                    <div className="discription">{data.discription}</div>
                  </div>
                  <div className="right">
                    <div
                      className={"price " + (data.price < 0 ? "red" : "green")}
                    >
                      {data.price}
                    </div>
                    <div className="datetime">{data.datetime}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </main>
  );
};

export default App;
