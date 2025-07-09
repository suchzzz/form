import * as React from 'react';
import { TextField, Stack, mergeStyleSets, DatePicker, DayOfWeek, Dropdown, IDropdownOption, defaultDatePickerStrings, Checkbox, IContextualMenuProps, Label } from '@fluentui/react';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { getEnumVal, log } from '../utils/helper';
const days: IDropdownOption[] = [
  { text: 'Sunday', key: DayOfWeek.Sunday },
  { text: 'Monday', key: DayOfWeek.Monday },
  { text: 'Tuesday', key: DayOfWeek.Tuesday },
  { text: 'Wednesday', key: DayOfWeek.Wednesday },
  { text: 'Thursday', key: DayOfWeek.Thursday },
  { text: 'Friday', key: DayOfWeek.Friday },
  { text: 'Saturday', key: DayOfWeek.Saturday },
];
const Inputs = ({ inputs, errors }) => {
  const [file, setFile] = useState();
  const { values, setFieldValue, handleBlur, handleChange, touched } = useFormikContext();
  // React.useEffect(()=>{
  //   console.log(values);
  // },[values])
  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'img',
        text: 'Picture',
        iconProps: { iconName: 'ImageCrosshair' },
      },
    ],
    // By default, the menu will be focused when it opens. Uncomment the next line to prevent this.
    // shouldFocusOnMount: false
  };
  let { parent, child, labell, fields, custom, errorStyle } = getClassNames();
  // const addIcon: IIconProps = { iconName: 'Add' };
  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

  return (
    <Stack
      horizontal
      wrap
      className={parent}
    >
      {inputs.map((item) => {
        let type = item.type
        switch (type) {

          case "text":
            return (<Stack key={item.id} className={child}>

              <Label htmlFor={item.id} className={labell}>{item.label}</Label>
              <Stack className={fields}>
                <TextField id={item.id} value={values?.[item.id]}
                  onChange={handleChange}
                  //  onChange={() => {
                  //   setFieldValue(item?.id, item?.data)
                  // }} 
                  onBlur={handleBlur} name={item.id}
                />
                <p className={errorStyle}>{touched[item.id] && errors[item.id]}</p>
              </Stack>
            </Stack>)

          case "date":
            return (<Stack key={item.id} className={child}>
              <Label htmlFor={item.id} className={labell}>{item.label}</Label>
              <Stack className={fields}>
                <DatePicker
                  firstDayOfWeek={firstDayOfWeek}
                  showWeekNumbers={true}
                  firstWeekOfYear={1}
                  showMonthPickerAsOverlay={true}
                  placeholder="Select a date..."
                  ariaLabel="Select a date"
                  strings={defaultDatePickerStrings}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className={errorStyle}>{touched[item.id] && errors[item.id]}</p>
              </Stack></Stack>)

          case "enum":
            return (<Stack key={item.id} className={child}>

              <Label htmlFor={item.id} className={labell}>{item.label}</Label>
              <Stack className={fields}>
                <Dropdown
                  placeholder="Select an option"
                  options={item.enums}
                  // defaultSelectedKey={values?.[item.id]}

                  selectedKey={values?.[item.id]}
                  // setFieldValue(item?.id,values?.[item.id])

                  // onChange={handleChange}. 
                  onChange={(e, val) => {
                    setFieldValue(item?.id, val?.data)
                  }}
                  onBlur={handleBlur}
                  className={item.id}
                /> <p className={errorStyle}>{touched[item.id] && errors[item.id]}</p>
              </Stack>
            </Stack>)

          case "big-text":
            return (<Stack key={item.id} className={child}>
              <Label htmlFor={item.id} className={labell}>{item.label}</Label>
              <Stack className={fields}>
                <TextField id={item.id} multiline rows={3} onChange={handleChange} onBlur={handleBlur} name={item.id} value={values?.[item.id]} />
                <p className={errorStyle}>{touched[item.id] && errors[item.id]}</p>
              </Stack>
            </Stack>)
          case "boolean":
            return (<Stack key={item.id} className={child}>
              <Label htmlFor={item.id} className={labell}></Label>
              <Checkbox label={item.label} onChange={handleChange} name={item.id} />
            </Stack>)
          case "custom":
            return (<Stack key={item.id} className={child}>
              <Label htmlFor={item.id} className={labell}>{item.label}</Label>
              <Stack className={custom}>
                {item.inputs.map((data) => {
                  // console.dir(data)
                  const ty = data.type;
                  switch (ty) {
                    case "enum":
                      return (
                        <Stack>
                          <Dropdown
                            placeholder="Select an option"
                            options={data.enums}
                            defaultSelectedKey={values?.[data.id]}
                            // onChange={handleChange}. 
                            onChange={(e, val) => {
                              setFieldValue(data?.id, val?.key)
                            }}
                            onBlur={handleBlur}
                            className={data.id}
                          /> <p className={errorStyle}>{touched[data.id] && errors[data.id]}</p>
                        </Stack>
                      )

                    default:
                      return (<Stack className={data.id}><TextField id={data.id} value={values?.[data.id]} onChange={(e, v) => {
                        setFieldValue(data?.id, v)
                        // handleChange(e)
                      }} onBlur={handleBlur} name={data.id} placeholder={data?.placeHolder} />
                        <p className={errorStyle}>{touched[data.id] && errors[data.id]}</p>
                      </Stack>)
                  }
                })
                }
              </Stack>
            </Stack>
            )
          default:
            return (<Stack key={item.id} className={child}>
              <Label htmlFor={item.id} className={labell}>{item.label}</Label>
              <Stack>
                <input type="file" onChange={(e) => {
                  if (e.currentTarget.files) {
                    setFieldValue(item.id, e.currentTarget.files[0]);
                  }
                }} />
                <p className={errorStyle}>{touched[item.id] && errors[item.id]}</p>
              </Stack>
            </Stack>)
        }
      })}
    </Stack>
  )
}
export default Inputs
export const getClassNames = () => {
  return mergeStyleSets({
    parent: {
      padding: "20px",
      gap: "10px",
    },
    child: {
      marginRight: "",
      padding: "2px",
      display: "flex",
      flexDirection: "row",
      width: "50%",
      '@media (max-width: 768px)': {
        width: '100%',
      },
    },
    labell: {
      display: "block",
      minWidth: "50%",
    },
    fields: {
      width: "40%",
      '@media (max-width: 768px)': {
        width: '80%',
      },
    },
    custom: {
      display: "flex",
      flexDirection: "row"
    },
    errorStyle: {
      color: 'red',
    }
  });
};