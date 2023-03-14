/**
 * @file
 * @date 2021-04-16
 * @author zhoubin
 * @lastModify  2021-04-16
 */

export interface surveyItemType {
    dri?: string;
    name?: string;
    creator_dri?: string;
    creator_name?: string;
    deliverable_tags?: string[];
    starred?: boolean;
    org_id?: string;
    org_name?: string;
    project_dri?: string;
    project_name?: string;
    updated_at?: string;
    created_at?: string;
    // status: string;
    // keywords: Array<string>;
    // created_at: string;
    // creator: {
    //     name: string;
    //     dri: string;
    // };
    // org_name: string;
    // org_id: string;
    // is_starred: boolean;
    // is_archived: boolean;
    // role: string;
    // participant_type: string;
    // deliverable_list: [
    //     {
    //         deliverable_name: string;
    //         deliverable_dri: string;
    //         deliverable_type: string;
    //         created_at: string;
    //     },
    // ];
}
// export const surveyList: Array<surveyItemType> = [
//     {
//         dri: 'dri:spm::proj/OwwUzLcpEbvdT5FA',
//         name: 'projectSelf',
//         status: 'public',
//         keywords: ['Official', 'Customer Satisfaction', 'Events', 'Education', 'Industry Specific'],
//         created_at: 'Feb/01/2021',
//         creator: {
//             name: 'zs',
//             dri: 'dri:acs::user/T-BwpPY1iW0I7Sefpyq8a',
//         },
//         org_name: 'zzz',
//         org_id: 'dri:acs::org/-OY_Zhmy5hc_TSWKus',
//         is_starred: true,
//         is_archived: false,
//         role: 'admin',
//         participant_type: 'client',
//         deliverable_list: [
//             {
//                 deliverable_name: 'survey_010',
//                 deliverable_dri: 'dri:spm::deliv:qed/OwwUzLcpEbvdT5FA/sqHRQVKuBmBws9ThJFpmMV',
//                 deliverable_type: 'qed',
//                 created_at: '2021-07-16T09:34:34.505Z',
//             },
//         ],
//     },
//     {
//         dri: 'dri:spm::proj/OwwUzLcpEbvdT5FB',
//         name: 'projectSelf',
//         status: 'public',
//         keywords: ['Official', 'Customer Satisfaction', 'Events', 'Education', 'Industry Specific'],
//         created_at: 'Feb/01/2021',
//         creator: {
//             name: 'zs',
//             dri: 'dri:acs::user/T-BwpPY1iW0I7Sefpyq8a',
//         },
//         org_name: 'zzz',
//         org_id: 'dri:acs::org/-OY_Zhmy5hc_TSWKus',
//         is_starred: true,
//         is_archived: false,
//         role: 'admin',
//         participant_type: 'client',
//         deliverable_list: [
//             {
//                 deliverable_name: 'survey_010',
//                 deliverable_dri: 'dri:spm::deliv:qed/OwwUzLcpEbvdT5FA/sqHRQVKuBmBws9ThJFpmMV',
//                 deliverable_type: 'qed',
//                 created_at: '2021-07-16T09:34:34.505Z',
//             },
//         ],
//     },
//     {
//         dri: 'dri:spm::proj/OwwUzLcpEbvdT5FC',
//         name: 'projectSelf',
//         status: 'public',
//         keywords: ['Official', 'Customer Satisfaction', 'Events', 'Education', 'Industry Specific'],
//         created_at: 'Feb/01/2021',
//         creator: {
//             name: 'zs',
//             dri: 'dri:acs::user/T-BwpPY1iW0I7Sefpyq8a',
//         },
//         org_name: 'zzz',
//         org_id: 'dri:acs::org/-OY_Zhmy5hc_TSWKus',
//         is_starred: false,
//         is_archived: false,
//         role: 'admin',
//         participant_type: 'client',
//         deliverable_list: [
//             {
//                 deliverable_name: 'survey_010',
//                 deliverable_dri: 'dri:spm::deliv:qed/OwwUzLcpEbvdT5FA/sqHRQVKuBmBws9ThJFpmMV',
//                 deliverable_type: 'qed',
//                 created_at: '2021-07-16T09:34:34.505Z',
//             },
//         ],
//     },
//     {
//         dri: 'dri:spm::proj/OwwUzLcpEbvdT5FD',
//         name: 'projectSelf',
//         status: 'public',
//         keywords: ['Official', 'Customer Satisfaction', 'Events', 'Education', 'Industry Specific'],
//         created_at: 'Feb/01/2021',
//         creator: {
//             name: 'zs',
//             dri: 'dri:acs::user/T-BwpPY1iW0I7Sefpyq8a',
//         },
//         org_name: 'zzz',
//         org_id: 'dri:acs::org/-OY_Zhmy5hc_TSWKus',
//         is_starred: true,
//         is_archived: false,
//         role: 'admin',
//         participant_type: 'client',
//         deliverable_list: [
//             {
//                 deliverable_name: 'survey_010',
//                 deliverable_dri: 'dri:spm::deliv:qed/OwwUzLcpEbvdT5FA/sqHRQVKuBmBws9ThJFpmMV',
//                 deliverable_type: 'qed',
//                 created_at: '2021-07-16T09:34:34.505Z',
//             },
//         ],
//     },
//     {
//         dri: 'dri:spm::proj/OwwUzLcpEbvdT5FE',
//         name: 'projectSelf',
//         status: 'public',
//         keywords: ['Official', 'Customer Satisfaction', 'Events', 'Education', 'Industry Specific'],
//         created_at: 'Feb/01/2021',
//         creator: {
//             name: 'zs',
//             dri: 'dri:acs::user/T-BwpPY1iW0I7Sefpyq8a',
//         },
//         org_name: 'zzz',
//         org_id: 'dri:acs::org/-OY_Zhmy5hc_TSWKus',
//         is_starred: false,
//         is_archived: false,
//         role: 'admin',
//         participant_type: 'client',
//         deliverable_list: [
//             {
//                 deliverable_name: 'survey_010',
//                 deliverable_dri: 'dri:spm::deliv:qed/OwwUzLcpEbvdT5FA/sqHRQVKuBmBws9ThJFpmMV',
//                 deliverable_type: 'qed',
//                 created_at: '2021-07-16T09:34:34.505Z',
//             },
//         ],
//     },
//     {
//         dri: 'dri:spm::proj/OwwUzLcpEbvdT5FF',
//         name: 'projectSelf',
//         status: 'public',
//         keywords: ['Official', 'Customer Satisfaction', 'Events', 'Education', 'Industry Specific'],
//         created_at: 'Feb/01/2021',
//         creator: {
//             name: 'zs',
//             dri: 'dri:acs::user/T-BwpPY1iW0I7Sefpyq8a',
//         },
//         org_name: 'zzz',
//         org_id: 'dri:acs::org/-OY_Zhmy5hc_TSWKus',
//         is_starred: true,
//         is_archived: false,
//         role: 'admin',
//         participant_type: 'client',
//         deliverable_list: [
//             {
//                 deliverable_name: 'survey_010',
//                 deliverable_dri: 'dri:spm::deliv:qed/OwwUzLcpEbvdT5FA/sqHRQVKuBmBws9ThJFpmMV',
//                 deliverable_type: 'qed',
//                 created_at: '2021-07-16T09:34:34.505Z',
//             },
//         ],
//     },
// ];
