import styled from "@emotion/styled";
import { Divider, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import {
  FMUCurrencyInput,
  FMUInput,
  MatxCircleCheckBox,
  MatxSearchField,
  MatxSquareCheckBox,
  SubmitButton,
} from "./components";
import testData from "./helper/testData.json";

const Title = styled("h3")({
  color:"#1b1b1b",
  marginBlockEnd:"0.5rem",
  fontSize:"1.6rem"
})
const CenterContainer = styled("div")({
  width: "90%",
  paddingBottom:"2vh",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "2vh",
});

const StyledDivided = styled(Divider)({
  marginTop:"2vh"
})

const FieldsContainer = styled("div")({
  width: "94%",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  rowGap: "15px",
  marginTop: "3vh",
});
const CategoryContainer = styled(Grid)({
  height: "50x",
  backgroundColor: "#eeeeee",
  borderRadius: "3px",
  paddingLeft: "5px",
});
const CategoryItems = styled(Grid)({
  paddingLeft: "15px",
});

function App() {
  const [data, setData] = useState({});
  const formRef = useRef();
  useEffect(() => {
    let result = {};
    result.unknown = {
      name: "unknown",
      items: [],
    };
    let tmp = testData;
    for (var item of tmp) {
      if (item.category) {
        if (result[item.category.name]) {
          result[item.category.name].items.push(item);
        } else {
          result[item.category.name] = {};
          result[item.category.name].name = item.category.name;
          result[item.category.name].items = [item];
        }
      } else {
        result.unknown.items.push(item);
      }
    }
    setData(result);
  }, []);
  const handleCheckedAll = ()=>{
    let tmp=[]
    for(let item of testData){
      tmp.push(item.id)
    }
    formRef.current.setFieldValue("applicable_items",tmp,false)
  }

  const handleSubmit = (value)=>{
    let e =JSON.parse(JSON.stringify(value))
    delete e.data
    if(e?.applicable_items.length === testData.length) e.applied_to='all'
    else e.applied_to='some'
    console.log(e)
  }
  
  const isCheckedAll = (values)=>{
    if(values?.applicable_items.length === testData.length) return true
    return false
    // return true
  }
  const isCategoryCheckedAll = (values,name)=>{
    let tmp = values?.applicable_items
    try{
      for(let item of values?.data[name]?.items){
        if(!tmp.includes(item.id)) return false
      }
    }catch{}
    return true
  }
  const handleChecked = (values,id)=>{
    let tmp =values?.applicable_items;
    const index = tmp.indexOf(id);
    if(index > -1){
      tmp.splice(index,1)
    }else{
      tmp.push(id)
    }
    formRef.current.setFieldValue("applicable_items",tmp,false)
  }
  const isChecked = (values,id)=>{
    let tmp =values?.applicable_items;
    if(tmp.includes(id)) return true
    return false
  }

  const handleCategoryCheck = (values,name)=>{
    let tmp = values?.applicable_items;
    if(isCategoryCheckedAll(values,name)===false){
      for(let item of values.data[name].items){
        const checked = isChecked(values,item.id)
        if(!checked) tmp.push(item.id)
      }
    }else{
      for(let item of values.data[name].items){
        let id = item.id
        const index = tmp.indexOf(id);
        if(index > -1){
          tmp.splice(index,1)
        }else{
          tmp.push(id)
        }
      }
    }
    formRef.current.setFieldValue("applicable_items",tmp,false)
  }
  
  return (
    <CenterContainer>
      <Formik
        initialValues={{
          name: "",
          rate: 0,
          applied_to: "",
          applicable_items: [],
          data:data
        }}
        onSubmit={handleSubmit}
        innerRef={formRef}
        enableReinitialize={true}
        render={({ isSubmitting, dirty, touched, values, setFieldValue }) => (
          <Form>
            <FieldsContainer>
              <Title>Add tax</Title>

              <Grid container columnGap={5}>
                <Grid item xs={4}>
                  <Field
                    name="name"
                    type="text"
                    placeholder={"Name"}
                    component={FMUInput}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Field
                    name="rate"
                    type="number"
                    placeholder={"Rate"}
                    component={FMUCurrencyInput}
                  />
                </Grid>
              </Grid>
              <Grid container flexDirection={"column"}>
                
                <MatxCircleCheckBox
                  label={"Apply to all items in collection"}
                  onChange={handleCheckedAll}
                  checked={isCheckedAll(values)}
                
                />
                <MatxCircleCheckBox
                  label={"Apply to specific items in collection"}
                  checked={!isCheckedAll(values)}
                />
              </Grid>
            </FieldsContainer>
            <StyledDivided />
            <FieldsContainer>
              <Grid container>
                <Grid item xs={3}>
                  <MatxSearchField type="text" placeholder={"Search"} />
                </Grid>
              </Grid>

              {Object.values(values.data).map((value, index) => (
                value.name==="unknown"? null : 
                <Grid>
                  <CategoryContainer item xs={12}>
                    <MatxSquareCheckBox
                    label={value.name}
                    checked={isCategoryCheckedAll(values,value.name)}
                    onChange={(e)=>{handleCategoryCheck(values,value.name)}}
                    />
                  </CategoryContainer>
                  {value.items.map((v, i) => (
                    <CategoryItems>
                      <MatxSquareCheckBox
                      label={v.name}
                      onChange={(e)=>{handleChecked(values,v.id)}}
                      checked={isChecked(values,v.id)}
                      />
                    </CategoryItems>
                  ))}
                </Grid>
              ))}

              <Grid>
                  <CategoryContainer item xs={12}>
                    <MatxSquareCheckBox
                    checked={isCategoryCheckedAll(values,'unknown')}
                    onChange={(e)=>{handleCategoryCheck(values,'unknown')}}
                    />
                  </CategoryContainer>
                  {values?.data?.unknown?.items.map((v, i) => (
                    <CategoryItems>
                      <MatxSquareCheckBox
                      label={v.name}
                      onChange={(e)=>{handleChecked(values,v.id)}}
                      checked={isChecked(values,v.id)}
                      />
                    </CategoryItems>
                  ))}

            </Grid>

              
            </FieldsContainer>
            <StyledDivided/>
            <Grid container justifyContent={'flex-end'}>
            <SubmitButton label={`Apply tax to ${values.applicable_items.length} item(s)`} type="submit" />
            </Grid>
          </Form>
        )}
      ></Formik>
    </CenterContainer>
  );
}

export default App;
