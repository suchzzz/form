import { mergeStyleSets, Stack } from "@fluentui/react"
import { Icon } from '@fluentui/react/lib/Icon';
const Navbar = () => {
    let { nav } = getClassNames();
    return (
        <Stack className={nav}>
            <Icon iconName="UserEvent" /> Sachin
        </Stack>
    )
}
export const getClassNames = () => {
    return mergeStyleSets({
        nav: {
            flexDirection: "col",
            width: '100%',
            height: '2rem',
            backgroundColor: '#008ae6',
            color: 'white',
            padding: "5px",
            justifyContent: "end",
            // ':hover': {
            //     background: 'green'
            // }
        }
    });
};
export default Navbar
