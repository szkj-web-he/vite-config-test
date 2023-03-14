/** bind questionnaire list */
export interface bindQueType {
    freeze: boolean;
    bound: boolean;
    name: string;
    version: string[];
    belongPro: string;
    belongOrg: string;
}
export const bindQueList: bindQueType[] = [
    {
        name: 'Questionnaire Demo xxxxxxxxxx xxxxxxxxxxx ABC',
        version: ['V1', 'V2', 'V3'],
        belongPro: 'Project Name xxxxxxxx ABC',
        belongOrg: 'Organization Demo Name xxxxxxxx A',
        freeze: true,
        bound: true,
    },
    {
        name: 'Questionnaire Demo xxxx ABC',
        version: ['V1', 'V10', 'V100'],
        belongPro: 'Project Name xxxxxxxx ABC',
        belongOrg: 'Organization Demo Name xxxxxxxx A',
        freeze: false,
        bound: true,
    },
    {
        name: 'Questionnaire  ABC',
        version: ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8'],
        belongPro: 'Project Name xxxxxxxx ABC',
        belongOrg: 'Organization Demo Name xxxxxxxx A',
        freeze: true,
        bound: false,
    },
    {
        name: 'ABC',
        version: ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8'],
        belongPro: 'Project Name xxxxxxxx ABC',
        belongOrg: 'Organization Demo Name xxxxxxxx A',
        freeze: true,
        bound: false,
    },
    {
        name: 'Qu ABC',
        version: ['V1', 'V2', 'V3'],
        belongPro: 'Project Name xxxxxxxx ABC',
        belongOrg: 'Organization Demo Name xxxxxxxx A',
        freeze: true,
        bound: false,
    },
    {
        name: 'Qe22233  ABC',
        version: ['V1', 'V2'],
        belongPro: 'Project Name xxxxxxxx ABC',
        belongOrg: 'Organization Demo Name xxxxxxxx A',
        freeze: true,
        bound: false,
    },
    {
        name: 'Que 33321ABC',
        version: ['V1', 'V2', 'V3'],
        belongPro: 'Project Name xxxxxxxx ABC',
        belongOrg: 'Organization Demo Name xxxxxxxx A',
        freeze: true,
        bound: false,
    },
];
