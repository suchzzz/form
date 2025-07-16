import axios from "axios"
import { DetailsList, DetailsListLayoutMode, SelectionMode, Stack, mergeStyleSets } from '@fluentui/react';
import { useEffect, useState } from "react";
import { IColumn, Icon } from "@fluentui/react";
import { getEnumVal } from "../utils/helper"
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton, } from '@fluentui/react';
import { SearchBox } from "@fluentui/react"
import Form from "../components/Form";
import { IBasicDetail, IBankDetails, roleTypeEnum, statusEnum, maratialStatusEnum, bloodGroupEnum } from '../utils/formItems';
import { deleteData } from "../utils/api";
import { useAuth } from "../context/AuthContext";

export interface IRes {
  id: string,
  bloodGroup: number,
  email: string,
  empId: string,
  empName: string,
  phone: string,
  presentAdress: string
  photoUrl: string
}
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 100 },
};
const Contents = ({ }) => {
  const [id, setId] = useState(null);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(Number(localStorage.getItem("show")??5));
  const [total, setTotal] = useState(0);
  const [initialValues, setInitialValues] = useState<IBasicDetail & IBankDetails | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const options: IDropdownOption[] = [
    { key: 2, text: '2' },
    { key: 5, text: '5' },
    { key: 10, text: '10' },
    { key: 20, text: '20' },
  ];


  const API_URL = import.meta.env.VITE_BASE_URL;
  const {validate}=useAuth();

  useEffect(() => {
    validate();
    axios.get(`${API_URL}/api/Employees`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page: page,
        show: show,
        query: query,
      }
    },)
      .then(function (response) {
        // console.log(response.data.response)
        setTotal(response.data.count);
        const data = response.data.response;
        data.map((d: IRes) => {
          d.bloodGroup = getEnumVal(bloodGroupEnum, d.bloodGroup)
          d.photoUrl = `${API_URL}/${d.photoUrl}`;
        })
        // console.log(data)
        setData(data)
      });
  }, [page, show, query, openSidebar])

 

  const [columns,setColumns] =useState<IColumn[]>( [
    {
      key: 'column1',
      name: 'SL no.',
      fieldName: "sl",
      minWidth: 50,
      maxWidth: 100,
    },
    {
      key: 'column2',
      name: 'Employee ID',
      fieldName: 'empId',
      minWidth: 50,
      maxWidth: 100,
    },
    {
      key: 'column3',
      name: 'Name',
      fieldName: 'empName',
      minWidth: 50,
      maxWidth: 100,
    },
    {
      key: 'column4',
      name: 'Email',
      fieldName: 'email',
      minWidth: 50,
      maxWidth: 100,
    },
    {
      key: 'column5',
      name: 'Phone Number',
      fieldName: 'phone',
      minWidth: 100,
      maxWidth: 100,
    },
    {
      key: 'column6',
      name: 'Present Address',
      fieldName: 'presentAdress',
      minWidth: 100,
      maxWidth: 100,
    },
    {
      key: 'column7',
      name: 'Blood Group',
      fieldName: 'bloodGroup',
      minWidth: 70,
      maxWidth: 120,
    },
    {
      key: 'column8', name: '', fieldName: 'id', minWidth: 0, maxWidth: 0, onRender(item, index, column) {
        return <Stack style={{ flexDirection: "row", gap: "10px" }}>
          <Icon iconName="Edit" className={editBtn}
            onClick={async (e) => {
              validate();
              axios.get(`${API_URL}/api/Employees`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                params: {
                  id: item.id
                }
              }).then((res) => {
                const data = res.data;
                setId(data.id);
                data.bloodGroup = getEnumVal(bloodGroupEnum, data.bloodGroup);
                data.maratialStatus = getEnumVal(maratialStatusEnum, data.maratialStatus);
                // console.log(data)
                data.photoUrl = `${API_URL}/${data.photoUrl}`;
                setInitialValues(data);
                setIsUpdating(true);
                setOpenSidebar(true);
              })
            }
            }
          />
          <Icon iconName="Delete" className={editBtn} onClick={async () => {
            await deleteData(item.id);
            validate();
            axios.get(`${API_URL}/api/Employees`, {
              headers: {
                'Authorization': `Bearer ${token}`
              },
              params: {
                page: page,
                show: show,
                query: query,
              }
            })
              .then(function (response) {
                setTotal(response.data.count);
                const data = response.data.response;
                data.map((d) => {
                  d.bloodGroup = getEnumVal(bloodGroupEnum, d.bloodGroup)
                })
                setColumns(columns);
                // setData(data)
                changeData(data);

              });
          }}
          />
        </Stack>;
      },
    },
    {
      key: 'column9',
      name: 'Image',
      fieldName: 'photoUrl',
      minWidth: 0,
      maxWidth: 0,
      onRender(item, index, column) {
        return <img src={item.photoUrl} style={{ width: "25px" }} alt="" />
      }
    },
  ]);
  const changeData=((d)=>{
    setData(d);
  })

  // const handleOpeningForm = (initialValues, isUpdating) => {
  //   setInitialVa lues(initialValues);
  //   setIsUpdating(isUpdating);
  //   setOpenSidebar(true);
  // };

  useEffect(() => {
    localStorage.setItem("show", JSON.stringify(show))
    // console.log(show);
  }, [show])

  let { chevrons, icons, btn, editBtn } = getClassNames();
  return (
    <Stack style={{ padding: "15px" }}>
      <Stack style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <Stack style={{display:"block"}}>
        <PrimaryButton text="+ ADD" onClick={() => {
          setInitialValues(null);
          setIsUpdating(false);
          setOpenSidebar(true);
        }} />
        
         {/* <PrimaryButton text="+ Employee" onClick={() => {
        }} /> */}
        </Stack>
        {openSidebar && <Form openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} isUpdating={isUpdating} id={id} setIsUpdating={setIsUpdating} initialValues={initialValues} />}
        <SearchBox placeholder="Search"
          onChange={newVal => setQuery(newVal?.target?.value ?? "")}
        />
      </Stack>
      <Stack style={{ width: '100%', margin: '0' }}>
        <h1>Employee Details</h1>
        <DetailsList
          items={data}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          selectionMode={SelectionMode.none}
        />
        <Stack className={chevrons}>
          <Dropdown
            placeholder={show.toString()}
            options={options}
            onChange={(e, val) => {
              setShow(Number(val?.key));
              // console.log(val?.key)
            }}
            styles={dropdownStyles}
          />
          <p> Page number {page + 1}</p>
          <Stack style={{ flexDirection: "row", padding: "5px", gap: "5px" }}>
            {page > 0 ? <PrimaryButton className={btn} text="Previous" onClick={() => {
              setPage(page - 1);
            }} /> : <PrimaryButton className={btn} disabled text="Previous" />}
            {((total - ((page + 1) * show)) > 0) ?
              <PrimaryButton className={btn} text="Next" onClick={() => {
                setPage(page + 1);
              }} /> : <PrimaryButton className={btn} text="Next" disabled
              />}</Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
export const getClassNames = () => {
  return mergeStyleSets({
    chevrons: {
      justifyContent: "space-between",
      flexDirection: "col",
      padding: "50px",
      textAlign: "center",
    },
    icons: {
      color: "red",
      cursor: "pointer",
      padding: "5px",
      ':hover': {
        background: "grey"
      },
      border: "2px solid black",
    },
    btn: {
      border: "none",
      padding: "2px"
    },
    editBtn: {
      ':hover': {
        cursor: "pointer"
      },
    }
  });
};

export default Contents
