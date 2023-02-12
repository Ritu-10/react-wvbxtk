import React, { useEffect, useState } from 'react';

export default function UserData() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  console.log('userData render');

  async function getData() {
    let res = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await res.json();
    setList(data);
  }
  useEffect(() => {
    console.log('userData render ue');
    getData();
  }, []);

  function ascendingOrder() {
    let x = list.sort((a, b) => {
      let charA = a.name.toLowerCase();
      let charB = b.name.toLowerCase();
      let flag = 0;
      if (charA > charB) {
        flag = 1;
      } else {
        flag = -1;
      }
      return flag;
    });
    // console.log(x)
    setList([...x]);
  }
  function descendingOrder() {
    let x = list.sort((a, b) => {
      let charA = a.name.toLowerCase();
      let charB = b.name.toLowerCase();
      let flag = 0;
      if (charA < charB) {
        flag = 1;
      } else {
        flag = -1;
      }
      return flag;
    });
    // console.log(x)
    setList([...x]);

    console.log('desending render');
  }

  function deleteUser(id) {
    setList((list) => list.filter((x) => x.id != id));
  }
  return (
    <>
      <button onClick={ascendingOrder}>Sort by A to Z</button>
      <button onClick={descendingOrder}>Sort by Z to A</button>
      <input placeHolder="search" onChange={(e) => setSearch(e.target.value)} />
      <table border="1px solid">
        <tr>
          <th>Serial No.</th>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Action</th>
        </tr>
        {list
          .filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))
          .map((x, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.email}</td>
              <td>{x.phone}</td>
              <button onClick={() => deleteUser(x.id)}>Delete</button>
            </tr>
          ))}
      </table>
    </>
  );
}
