import { Icon } from '@fluentui/react/lib/Icon';
import { Nav, Stack, mergeStyleSets } from '@fluentui/react';
import { useState } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { navLinkGroups } from "../utils/navLinkGroups"
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const [selected, setSelected] = useState<any>("key1");
    const [showPannel, setShowPannel] = useState<boolean>(true);
    let { ham, pannel,navi } = getClassNames();
    const navigate = useNavigate();
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
                        groups={navLinkGroups}
                        onLinkClick={(ev, item) => {
                            ev?.preventDefault();
                            navigate(item?.url ?? "")
                            setSelected(item?.key)
                        }}
                        className={navi}
                    />
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
        navi:{
            padding:'5px',
            marginTop:"10px"
        }
    });
};

export default SideBar
