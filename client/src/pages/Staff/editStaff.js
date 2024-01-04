import React, { useState, useEffect } from "react";
import { Space } from "antd";
import AppHeader from "../../components/AdminDashboard/AppHeader";
import SideMenu from "../../components/AdminDashboard/SideMenu";
import AppFooter from "../../components/AdminDashboard/AppFooter";
import "../Courses/EditCourses.css";
import toast from "react-hot-toast";
import CreatableSelect from "react-select/creatable";

const EditStaff = () => {
  const [staff, setStaff] = useState([]);
  const [editedRowIndex, setEditedRowIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const [updatedStaffName, setUpdatedStaffName] = useState("");
  const [updatedPosition, setUpdatedPosition] = useState("");
  const [updatedAccounts, setUpdatedAccounts] = useState([]);
  const [query, setQuery] = useState("");

  const fetchStaff = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/staff");
      if (response.ok) {
        const data = await response.json();
        const modifiedData = data.staff.map((item) => ({
          StaffName: item.StaffName,
          Position: item.Position,
          accounts: Array.isArray(item.accounts) ? item.accounts : [],
        }));
        setStaff(data.staff);
      } else {
        throw new Error("Failed to fetch staff");
      }
    } catch (error) {
      console.error(error);
      // Handle error here (e.g., setError(error.message))
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const deleteModal = (id) => {
    let url = `http://localhost:5000/api/staff/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          toast.success("Delete Successfully");
          fetchStaff();
        } else {
          console.error(resp.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEdit = (item,index) => {
    const {_id, StaffName, Position, accounts} = item

    console.log(item)
    setEditedRowIndex(index);
    setEditId(_id);
    setUpdatedStaffName(StaffName);
     setUpdatedPosition(Position);
    // Assuming accounts is an array of objects with a 'value' property
    // setUpdatedAccounts(accounts.map((account) => account.value).join(", "));
  };

  const handleUpdate = async () => {
    const updatedData = {
      StaffName: updatedStaffName,
      Position: updatedPosition,
      accounts:updatedAccounts
      // accounts: updatedAccounts.split(",").map((account) => account.trim()), // Convert comma-separated string to array and trim spaces
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/staff/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          fetchStaff();
          toast.success("Staff Updated Successfully");
          setEditId(null);
          setEditedRowIndex(null);
        } else {
          console.error(data.message);
          // Handle error scenario here, if necessary
        }
      } else {
        console.error("Failed to update the staff");
        // Handle error scenario here, if necessary
      }
    } catch (error) {
      console.error("Error occurred while updating staff:", error);
      // Handle error scenario here, if necessary
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditedRowIndex(null);
  };

  const searchUsers = staff.filter((user) => {
    let text1 = query.toLowerCase();
    return text1 ? user?.StaffName?.toLowerCase().includes(text1) : true;
  });

  return (
    <div>
      <AppHeader />
      <Space className="SideMenuAndPageContent">
        <SideMenu />
        <section className="coursesCard">
          <div className="container grid2 coursetable">
            <input
              value={query}
              type="text"
              placeholder="Search....."
              className="search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="container grid2 coursetable">
            <table className="table dataTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Accounts</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchUsers.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {editedRowIndex === index ? (
                        <input
                          type="text"
                          value={updatedStaffName}
                          onChange={(e) => setUpdatedStaffName(e.target.value)}
                        />
                      ) : (
                        item.StaffName
                      )}
                    </td>
                    <td>
                      {editedRowIndex === index ? (
                        <input
                          type="text"
                          value={updatedPosition}
                          onChange={(e) => setUpdatedPosition(e.target.value)}
                        />
                      ) : (
                        item.Position
                      )}
                    </td>
                    <td>
                      {editedRowIndex === index ? (
                        <CreatableSelect
                          onChange={(vals) =>{
                            setUpdatedAccounts(vals)
                            console.log(vals)
                          }}
                          isMulti
                          isClearable
                          options={updatedAccounts}
                          defaultValue={item.accounts}
                        />
                      ) : (
                        // <input
                        //   type='text'
                        //   value={updatedAccounts}
                        //   onChange={(e) => setUpdatedAccounts(e.target.value)}
                        // />
                        item?.accounts.map((acc) => <span>{acc.label}</span>)
                      )}
                    </td>
                    <td>
                      {editedRowIndex === index ? (
                        <React.Fragment>
                          <button className="courseBtn" onClick={handleUpdate}>
                            Update
                          </button>
                          <button
                            className="courseBtn"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <button
                            className="courseBtn"
                            onClick={() =>handleEdit(item,index)}
                          >
                            Edit
                          </button>
                          <button
                            className="courseBtn"
                            onClick={() => deleteModal(item._id)}
                          >
                            Delete
                          </button>
                        </React.Fragment>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Space>
      <AppFooter />
    </div>
  );
};

export default EditStaff;
