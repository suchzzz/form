import {  INavLinkGroup } from '@fluentui/react';
const navLinkGroups: INavLinkGroup[] = [
    {
        links: [
            {
                name: 'Employyes',
                url: '/emp',
                key: 'key2',
                icon: 'TemporaryUser',
            },
            {
                name: 'Leaves',
                url: '/leaves',
                key: 'key3',
                icon: "Leave"
            },
            {
                name: 'Attendance request',
                url: '/attendance',
                key: 'key4',
                icon: "EventDateMissed12"
            },
            {
                name: 'Report',
                url: '/report',
                key: 'key5',
                icon: "ReportDocument"
            },
            {
                name: 'Event',
                url: '/event',
                key: 'key6',
                icon: "Event"
            },
            {
                name: 'Company Policy',
                url: '/policy',
                key: 'key7',
                icon: 'EntitlementPolicy',
            },
        ],
    },
];



export const getNavLinks=((userType)=>{
    if(userType=="admin")
    {
        const dash={
                name:'Dashboard',
                url:'/',
                icon: 'DashboardAdd',
                key:'key1'
            };
        navLinkGroups?.[0].links.unshift(dash);
    }
    return navLinkGroups;

})