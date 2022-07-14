import React from "react";
import "./Github.css";

export const Github = () => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [number, setNumber] = React.useState([1, 2, 3, 4, 5]);
  const [sort, setSort] = React.useState("desc");
  const [loading,setLoading]=React.useState(false)

  async function GithubData(react = "react", sort_by = "updated") {
    setLoading(true)
    console.log("s");
    let res = await fetch(
      `https://api.github.com/search/repositories?q=${react}&page=${page}&per_page=100&sort=${sort_by}&order=${sort}`
    );
    // console.log(res)
    let out = await res.json();
    setData(out.items);
    console.log(out.items);
    setTotal(out.total_count);

    // console.log(out.items)
  }

  function Pagination(params) {
    let x = [];
    for (var i = 0; i < number.length; i++) {
      x.push(number[i] + 5);
    }
    console.log(x);
    console.log(number);
    setNumber([...x]);
    //  GithubData(search)
  }

  // [5,6,7,8]
  function PrevPagination() {
    let y = [];
    for (var i = 0; i < number.length; i++) {
      y.push(number[i] - 5);
    }
    //  console.log(y)
    setNumber([...y]);
    //  GithubData(search)
  }

  // console.log(setData)
  React.useEffect(() => {
    setLoading(false)
  }, [data]);

  const handleSelect = (value) => {
    console.log(value);
    setSort(value);
  };

  const handleClick = () => {
    // console.log("clicked")
    //  GithubData(search)
    setSearch("");
  };
  React.useEffect(() => {
    GithubData();
  }, [page, sort]);

  return (
    loading? (<div>...loading</div>) : (
    <div>
      <div className="input">
        <input
          className="inputBox"
          type="text"
          placeholder="Search Repositry"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className="button" onClick={handleClick}>
          Click
        </button>
        <span>Total Count={total}</span>
      </div>
      <div className="pagination">
        <button disabled={number[0] === 1?true:false} onClick={PrevPagination}>Previous</button>

        {number.map((items) => {
          return (
            <div
              onClick={() => {
                setPage(items)
              }}
            >
              {items}
            </div>
          );
        })}
        <button disabled={number[4] === 10?true:false} onClick={Pagination}>Next</button>
      </div>

      <div>
        <select
          onChange={(e) => {
            setSort(e.target.value);
          }}
          name=""
          id=""
          value="sort"
          title="order"
          type="radio"
        >
          <option value="order">Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="bigDataShow">
        {data.map((item) => {
          return (
            <div className="defaultDataShow">
              <p>id: {item.id}</p>
              <p> full_Name: {item.full_name}</p>
              <p> Fork_count: {item.forks_count}</p>
              <p>Watchers_count: {item.watchers_count}</p>
              {/* <p>Language: {item.language}</p> */}
              {/* <p>Login: {item.login}</p> */}
            </div>
          );
        })}
      </div>
    </div>

    )
  );
};
