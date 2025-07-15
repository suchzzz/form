import { Icon } from '@fluentui/react/lib/Icon';
import { Nav, Stack, mergeStyleSets } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { getNavLinks } from "../utils/routes"
import { INavLinkGroup } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { useAuth } from '../context/AuthContext';
const SideBar = () => {

    const [selected, setSelected] = useState<any>("key1");
    const [showPannel, setShowPannel] = useState<boolean>(true);
    let { ham, pannel, navi } = getClassNames();
    const navigate = useNavigate();
    const { logout, role,nav } = useAuth();

    return (
        <Stack className={ham}>
            <Icon iconName="GlobalNavButton" />
            <Panel
                isOpen={showPannel}
                // onDismiss={() => setShowPannel(!showPannel)}
                // closeButtonAriaLabel="Close"
                className={pannel}
                type={PanelType.customNear}
                hasCloseButton={false}
                isBlocking={false}
            >
                <Stack>
                    <img src="capsitech.jpg" width={"50%"} alt="" />
                    <Nav selectedKey={selected} ariaLabel="Nav example with wrapped link text"
                        groups={nav}
                        onLinkClick={(ev, item) => {
                            ev?.preventDefault();
                            navigate(item?.url ?? "")
                            setSelected(item?.key)
                        }}
                        className={navi}
                    />
                    <PrimaryButton text='Logout' onClick={logout} />
                </Stack>
            </Panel>
        </Stack>
    )
}
export const getClassNames = () => {
    return mergeStyleSets({
        ham: {
            cursor: "pointer",
            padding: "10px",
        },
        pannel: {
            maxWidth: "20%",
        },
        navi: {
            padding: '5px',
            marginTop: "10px"
        }
    });
};

export default SideBar
