import {  INavLinkGroup } from '@fluentui/react';
export const navLinkGroups: INavLinkGroup[] = [
    {
        links: [
            {
                name: 'Dashboard',
                url: '/',
                key: 'key1',
                icon: 'DashboardAdd',
            },
            {
                name: 'Leaves',
                url: '/leaves',
                key: 'key2',
                icon: "Leave"
            },
            {
                name: 'Attendance request',
                url: '/attendance',
                key: 'key3',
                icon: "EventDateMissed12"
            },
            {
                name: 'Report',
                url: '/report',
                key: 'key4',
                icon: "ReportDocument"
            },
            {
                name: 'Event',
                url: '/event',
                key: 'key5',
                icon: "Event"
            },
            {
                name: 'Company Policy',
                url: '/policy',
                key: 'key6',
                icon: 'EntitlementPolicy',
            },
        ],
    },
];