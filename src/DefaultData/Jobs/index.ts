export interface JobListType {
    id: string;
    name: string;
    create_time: string;
    owner_org: {
        id: string;
        name: string;
        logo: string;
    };
    creator: {
        id: string;
        name: string;
        avatar: string;
    };
    talent_group_id: string;
    description: string;
    refresh_time?: number;
    data_source: {
        type: 0 | 1;
        source_job?: {
            id: string;
            name: string;
            description: string;
        };
        source_questionnaire?: {
            id: string;
            name: string;
            version: {
                id: string;
                tag: string;
            };
        };
    };
}

export const jobList: JobListType[] = [
    {
        id: '1',
        name: 'job_001',
        create_time: '2022-05-13T09:01:54.727Z',
        owner_org: {
            id: '1',
            name: 'org_001',
            logo: 'img',
        },
        creator: {
            id: '1',
            name: 'zzz',
            avatar: 'img',
        },
        refresh_time: 15,
        talent_group_id: '',
        description: 'desc_job_02',
        data_source: {
            type: 0,
            source_job: {
                id: '4',
                name: 'job_004',
                description: 'desc_job_04',
            },
        },
    },
    {
        id: '2',
        name: 'job_002',
        create_time: '2022-05-13T09:01:54.727Z',
        owner_org: {
            id: '1',
            name: 'org_001',
            logo: 'img',
        },
        creator: {
            id: '1',
            name: 'zzz',
            avatar: 'img',
        },
        talent_group_id: '',
        description: 'desc_job_03',
        data_source: {
            type: 1,
            source_questionnaire: {
                id: '1',
                name: 'questionnaire_001',
                version: {
                    id: '1',
                    tag: 'v3',
                },
            },
        },
    },
    {
        id: '3',
        name: 'job_003',
        create_time: '2022-05-13T09:01:54.727Z',
        owner_org: {
            id: '1',
            name: 'org_001',
            logo: 'img',
        },
        creator: {
            id: '1',
            name: 'zzz',
            avatar: 'img',
        },
        refresh_time: 20,
        talent_group_id: '',
        description: 'desc_job_04',
        data_source: {
            type: 1,
            source_questionnaire: {
                id: '2',
                name: 'questionnaire_001',
                version: {
                    id: '3',
                    tag: 'v1',
                },
            },
        },
    },
    {
        id: '4',
        name: 'job_004',
        create_time: '2022-05-13T09:01:54.727Z',
        owner_org: {
            id: '1',
            name: 'org_001',
            logo: 'img',
        },
        creator: {
            id: '1',
            name: 'zzz',
            avatar: 'img',
        },
        refresh_time: 30,
        talent_group_id: '',
        description: 'desc_job_05',
        data_source: {
            type: 0,
            source_job: {
                id: '3',
                name: 'job_003',
                description: 'desc_job_03',
            },
        },
    },
    {
        id: '5',
        name: 'job_005',
        create_time: '2022-05-13T09:01:54.727Z',
        owner_org: {
            id: '1',
            name: 'org_001',
            logo: 'img',
        },
        creator: {
            id: '1',
            name: 'zzz',
            avatar: 'img',
        },
        talent_group_id: '',
        description: 'desc_job_06',
        data_source: {
            type: 0,
            source_job: {
                id: '1',
                name: 'job_001',
                description: 'desc_job_01',
            },
        },
    },
    {
        id: '6',
        name: 'job_006',
        create_time: '2022-05-13T09:01:54.727Z',
        owner_org: {
            id: '1',
            name: 'org_001',
            logo: 'img',
        },
        creator: {
            id: '1',
            name: 'zzz',
            avatar: 'img',
        },
        refresh_time: 10,
        talent_group_id: '',
        description: 'desc_job_01',
        data_source: {
            type: 1,
            source_questionnaire: {
                id: '3',
                name: 'questionnaire_001',
                version: {
                    id: '2',
                    tag: 'v2',
                },
            },
        },
    },
];

export const questionnaire_list = [
    {
        id: '1',
        name: 'questionnaire_001',
        version: [
            {
                id: '1',
                tag: 'v1',
            },
            {
                id: '2',
                tag: 'v2',
            },
            {
                id: '3',
                tag: 'v3',
            },
        ],
    },
    {
        id: '2',
        name: 'questionnaire_002',
        version: [
            {
                id: '1',
                tag: 'v4',
            },
            {
                id: '2',
                tag: 'v5',
            },
            {
                id: '3',
                tag: 'v6',
            },
        ],
    },
    {
        id: '3',
        name: 'questionnaire_003',
        version: [
            {
                id: '1',
                tag: 'v7',
            },
            {
                id: '2',
                tag: 'v8',
            },
            {
                id: '3',
                tag: 'v9',
            },
        ],
    },
];

export const refreshTimeList = [
    {
        title: '10分钟',
        time: 10,
        company: '分钟',
        minute: 10,
    },
    {
        title: '30分钟',
        time: 30,
        company: '分钟',
        minute: 30,
    },
    {
        title: '1小时',
        time: 60,
        company: '小时',
        minute: 1,
    },
    {
        title: '2小时',
        time: 120,
        company: '小时',
        minute: 2,
    },
    {
        title: '6小时',
        time: 360,
        company: '小时',
        minute: 6,
    },
    {
        title: '12小时',
        time: 720,
        company: '小时',
        minute: 12,
    },
    {
        title: '24小时',
        time: 1440,
        company: '小时',
        minute: 24,
    },
    {
        title: '7天',
        time: 10080,
        company: '天',
        minute: 7,
    },
];
