// import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
// //use Modal
// import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
// import { Formik } from 'formik';
// import { Stack } from '@fluentui/react';
// const Form = ({ openSidebar, setOpenSidebar }) => {
//     const toggle = () => {
//         setOpenSidebar(!openSidebar);
//     }
//     return (
//         <Dialog
//             hidden={!openSidebar}
//         >
//             <Stack>
//                 <h1>My Form</h1>
//                 <Formik
//                     initialValues={{ name: 'jared' }}
//                     onSubmit={(values, actions) => {
//                         setTimeout(() => {
//                             alert(JSON.stringify(values, null, 2));
//                             actions.setSubmitting(false);
//                             toggle();
//                         }, 1000);
//                     }}
//                 >
//                     {props => (
//                         <form onSubmit={props.handleSubmit}>
//                             <input
//                                 type="text"
//                                 onChange={props.handleChange}
//                                 onBlur={props.handleBlur}
//                                 value={props.values.name}
//                                 name="name"
//                             />
//                             {props.errors.name && <div id="feedback">{props.errors.name}</div>}
//                             {/* <button type="submit">Submit</button> */}
//                             <DialogFooter>
//                                 <PrimaryButton type="submit" text="Save" />
//                                 <DefaultButton onClick={toggle} text="Cancel" />
//                             </DialogFooter>
//                         </form>
//                     )}
//                 </Formik>
//             </Stack>
//         </Dialog>
//     )
// }
// export default Form
